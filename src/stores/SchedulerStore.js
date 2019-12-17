import {
  observable,
  action,
  computed,
  reaction,
} from 'mobx';

import colors from '../colors';
import history from '../history';
import { API_ROOT } from '../settings';
import { getJson, postJson } from '../modules/httpsClient';
import { THIS_MONTH, THIS_YEAR, isSameDay } from '../modules/calendar';
import notificationStore from './NotificationStore';

class SchedulerStore {
  // Controllers.
  @observable isLoading = true;

  @observable groupByProduct = false;

  @observable selectedLines = [];

  @observable linesQuantities = [];

  @observable availableDates = [];

  @observable intervals = [];

  @observable selectedDate = undefined;

  @observable selectedInterval = undefined;

  @observable selectedPeriod = {
    month: THIS_MONTH,
    year: THIS_YEAR,
  }

  // Data.
  @observable data = {
    orders: [],
    supplier: {},
    warehouse: {},
  }

  @observable leadtime = undefined;

  constructor() {
    reaction(() => this.selectedPeriod, () => this.loadAvailableDates());

    reaction(() => this.availableDates, (dates) => {
      if (this.data.delivery) {
        this.selectedDate = new Date(this.data.delivery.deliveryDate);
      } else if (!this.selectedDate && this.availableDates.length > 0) {
        this.selectedDate = new Date(dates[0].date);
      }
    });

    reaction(() => this.selectedDate, (selectedDate) => {
      const {
        intervals,
      } = this.availableDates.find(({ date }) => isSameDay(new Date(date), selectedDate)) || {};

      this.intervals = intervals || [];
      [this.selectedInterval] = this.intervals;
    });
  }

  @action reset = () => {
    this.orders = [];
    this.selectedLines = [];
    this.collapsedOrders = [];
    this.groupByProduct = false;
    this.selectedDate = undefined;
    this.selectedInterval = undefined;
  }

  setData = (data) => {
    const quantities = data.orders.map((order) => order.lines.map((line) => ({
      id: `${order.id}/${line.productId}`,
      ean: line.productEan,
      quantity: line.quantity,
      packSize: line.packSize,
      orderExternalId: order.externalId,
      productExternalId: line.productExternalId,
    })));

    this.linesQuantities = [].concat(...quantities);
    this.data.orders = data.orders;
    if (data.orders.length === 1) this.leadtime = data.orders[0].leadtime;
    this.data.warehouse = data.warehouse;
    this.data.supplier = data.supplier;
    if (data.delivery) {
      this.data.delivery = data.delivery;
      // this.selectedDate = new Date(data.delivery.deliveryDate);
    }
  }

  @action loadSchedule = (orders, supplier, warehouse) => {
    this.isLoading = true;

    getJson(`${API_ROOT}/deliveries/schedule`, { orders, supplier, warehouse })
      .then(({ data }) => {
        this.setData(data);
        this.isLoading = false;
      });
  }

  @action schedule = (data, callback) => {
    this.isLoading = true;

    postJson(`${API_ROOT}/deliveries/schedule`, data)
      .then(({ data: resp, errors }) => {
        this.isLoading = false;

        errors.forEach((error) => {
          notificationStore.broadcast({
            payload: error,
            color: colors.error,
          });
        });

        if (!errors || errors.length === 0) {
          const message = `Entrega <a href="/entregas/detalhas?id=${resp.id}">${resp.label}</a> criada com sucesso.`;

          notificationStore.broadcast({
            payload: message,
            color: colors.success,
          });

          callback();
        }
      });
  }

  @action loadReschedule = (id) => {
    this.isLoading = true;

    getJson(`${API_ROOT}/deliveries/reschedule`, { id })
      .then(({ data }) => {
        this.setData(data);
        this.isLoading = false;
      });
  }

  @action reschedule = (data, callback) => {
    postJson(`${API_ROOT}/deliveries/reschedule`, data).then(({ errors }) => {
      this.isLoading = false;

      errors.forEach((error) => {
        notificationStore.broadcast({
          payload: error,
          color: colors.error,
        });
      });

      if (!errors || errors.length === 0) {
        const message = `Entrega <a href="/entregas/detalhes?id=${this.data.delivery.id}">${this.data.delivery.label}</a> reagendada com sucesso.`;

        notificationStore.broadcast({
          color: colors.success,
          payload: message,
        });
        callback();
      }
    });
  }

  @action toggleGroupByProduct = () => this.groupByProduct = !this.groupByProduct;

  isSelected = (id) => computed(() => this.selectedLines.includes(id)).get()

  areAllSelected = (ids) => computed(() => ids.every((id) => this.selectedLines.includes(id))).get()

  @action toggleSelect = (id) => {
    const index = this.selectedLines.indexOf(id);
    if (index === -1) this.selectedLines.push(id);
    else this.selectedLines.splice(index, 1);
  }

  toggleSelectAll = (ids) => {
    const unselected = ids.filter((id) => !this.selectedLines.includes(id));
    if (unselected.length > 0) {
      this.selectedLines.push(...unselected);
    } else {
      const selected = ids.filter((id) => !unselected.includes(id));
      selected.forEach((id) => this.selectedLines.splice(this.selectedLines.indexOf(id), 1));
    }
  }

  findQuantity = (id) => this.linesQuantities.find((line) => line.id === id)

  getQuantity = (id) => computed(() => this.findQuantity(id).quantity).get()

  @action setQuantity = (id, quantity) => this.findQuantity(id).quantity = quantity;

  @action sumQuantity = (id, value) => this.findQuantity(id).quantity = value + 1;

  @action subQuantity = (id, value) => this.findQuantity(id).quantity = value - 1;

  getVolumes = (id) => computed(() => {
    const line = this.findQuantity(id);
    return Math.ceil(line.quantity / line.packSize);
  }).get();

  @action setVolumes = (id, volumes) => {
    const line = this.findQuantity(id);
    line.quantity = volumes * line.packSize;
  }

  @action sumVolumes = (id, value) => {
    const line = this.findQuantity(id);
    line.quantity = (value + 1) * line.packSize;
  }

  @action subVolumes = (id, value) => {
    const line = this.findQuantity(id);
    line.quantity = (value - 1) * line.packSize;
  }

  @computed get selected() {
    const selected = this.linesQuantities.filter(({ id }) => this.isSelected(id));

    return {
      lines: selected.length,
      volumes: selected.reduce((total, { id }) => total + this.getVolumes(id), 0),
      quantity: selected.reduce((total, { quantity }) => total + quantity, 0),
    };
  }

  @action loadAvailableDates = () => {
    this.isLoading = true;
    this.availableDates = [];

    getJson(`${API_ROOT}/warehouses/available-delivery-dates`, {
      month: this.selectedPeriod.month,
      year: this.selectedPeriod.year,
      warehouseId: this.data.warehouse.id,
    }).then(({ data }) => {
      this.availableDates = data;
      this.isLoading = false;
    });
  }

  @action setDate = (date) => this.selectedDate = date;

  @action setSelectedPeriod = (period) => this.selectedPeriod = period;

  @action setInterval = (interval) => this.selectedInterval = interval;

  @computed get selectedOrders() {
    return this.data.orders.map((order) => ({
      ...order,
      lines: order.lines.filter((line) => this.selectedLines.includes(`${order.id}/${line.productId}`)).map((line) => ({
        ...line,
        quantity: this.getQuantity(`${order.id}/${line.productId}`),
        volumes: this.getVolumes(`${order.id}/${line.productId}`),
      })),
    })).filter((order) => order.lines.length > 0);
  }

  getData = () => {
    const lines = this.selectedOrders.map((order) => order.lines.map((line) => ({
      orderId: order.id,
      productId: line.productId,
      productDescription: line.productDescription,
      packSize: line.packSize,
      quantity: line.quantity,
    })));

    let data = {
      deliveryDate: this.selectedDate,
      deliveryInterval: this.selectedInterval,
      lines: [].concat(...lines),
    };

    if (this.data.delivery) {
      data = {
        ...data,
        deliveryId: this.data.delivery.id,
      };
    } else {
      data = {
        ...data,
        orders: this.data.orders.map((order) => order.id),
        supplierId: this.data.supplier.id,
        warehouseId: this.data.warehouse.id,
      };
    }

    return data;
  }

  @action finish = (onFinish) => {
    onFinish(
      this.getData(),
      () => {
        history.push('/entregas');
      },
    );
  }

  findByExternalId = (orderId, externalId) => this.linesQuantities.find(
    (line) => line.orderExternalId === orderId && line.productExternalId === externalId,
  );

  findIdByEan = (orderId, ean) => this.linesQuantities.find(
    (line) => line.orderExternalId === orderId && line.ean === ean,
  );

  @action importItems = (data) => {
    data.forEach((item) => {
      if (!item || !item.orderId) return;

      let line = null;

      if (item.externalId) line = this.findByExternalId(item.orderId, item.externalId);
      else if (item.ean) line = this.findIdByEan(item.orderId, item.ean.toString());

      if (line) {
        this.toggleSelect(line.id);
        this.setQuantity(line.id, item.quantity);
      }
    });

    notificationStore.broadcast({
      payload: 'Importação realizada com sucesso',
    });
  }

  validateImport = (data) => {
    if (!data || !Array.isArray(data) || data.length < 1) {
      notificationStore.broadcast({
        payload: 'Arquivo inválido.',
        color: colors.error,
      });

      return false;
    }

    const errors = [];

    data.forEach((item, i) => {
      let fail = false;

      if (!fail && !item.orderId) fail = true;
      if (!fail && !item.quantity) fail = true;
      if (!fail && !item.externalId && !item.ean) fail = true;

      if (fail) {
        errors.push(`Linha inválida: ${i + 1}.`);
      }
    });

    errors.forEach((error) => {
      notificationStore.broadcast({
        payload: error,
        color: colors.warning,
      });
    });

    return errors.length === 0;
  }

  @action loadItemsFromFile = (data) => {
    if (this.validateImport(data)) this.importItems(data);
  }
}

export default SchedulerStore;
