/* eslint-disable no-unused-vars */
import { action, observable, reaction } from 'mobx';
import { API_ROOT } from '../settings';
import { getJson } from '../modules/httpsClient';
import { getTextByStatus, getColorByStatus } from '../helpers/OrdersStatus';

class OrderDetailsStore {

  // data
  @observable order = {
    lines: [],
    deliveries: [],
  };

  @observable lines = [];

  @observable warehouse = undefined;

  @observable supplier = undefined;

  @observable owner = undefined;

  @observable deliveries = [];

  @observable quantityPerStatus = [];

  @observable pendingItems = false;

  // controllers
  @observable isLoading = false;

  constructor() {
    reaction(
      () => this.pendingItems,
      (show) => this.showPendingItems(show),
    );
  }

  @action showPendingItems = (show) => {
    if (show) {
      this.lines = this.order.lines.filter((line) => line.pendingQuantity > 0);
    } else {
      this.lines = this.order.lines;
    }
  };

  @action reset = () => {
    this.order = {
      lines: [],
      deliveries: [],
    };

    this.warehouse = undefined;
    this.supplier = undefined;
    this.owner = undefined;
    this.deliveries = [];
  }

  @action togglePendingItems = () => this.pendingItems = !this.pendingItems;

  @action load = (id) => {
    this.isLoading = true;

    getJson(`${API_ROOT}/orders/${encodeURIComponent(id)}`).then(({ data }) => {
      this.order = {
        ...data.order,
        label: data.order.externalId,
        schedulingUrl: `/agendamento?supplierId=${encodeURIComponent(data.supplier.id)}&warehouseId=${encodeURIComponent(data.warehouse.id)}&ids=${encodeURIComponent(data.order.id)}`,
      };

      this.lines = this.order.lines;
      this.order.deliveries = this.mapDeliveries(data.order.deliveries);
      this.warehouse = data.warehouse;
      this.supplier = data.supplier;
      this.owner = data.owner;

      this.isLoading = false;
    });
  }

  mapDeliveries = (deliveries) => deliveries.map((delivery) => ({
    ...delivery,
    deliveryDate: new Date(delivery.deliveryDate),
    label: `ENTR${String(delivery.number).padStart(6, '0')}`,
    url: `/entregas/detalhes?id=${encodeURIComponent(delivery.id)}`,
  }))

  @action loadDeliveries = () => {
    this.isLoading = true;

    getJson(`${API_ROOT}/deliveries/by-order-id/${encodeURIComponent(this.order.id)}`)
      .then(({ data }) => {
        this.deliveries = this.mapDeliveries(data);
        this.isLoading = false;
      });
  }

  @action loadQuantitiesByStatus = (id) => {
    getJson(`${API_ROOT}/orders/quantity-per-status/${encodeURIComponent(id)}`)
      .then(({ data }) => {
        this.quantityPerStatus = Object.keys(data.status).map((key) => ({
          status: getTextByStatus(key),
          count: data.status[key],
          color: getColorByStatus(key),
        }));
      });
  }
}

export default OrderDetailsStore;
