import { action, observable, reaction } from 'mobx';

import { API_ROOT } from '../settings';
import { getJson } from '../modules/httpsClient';
import { THIS_MONTH, THIS_YEAR } from '../modules/calendar';

class DeliveriesStore {

  // Filter properties.
  @observable totalDeliveriesByStatus = [];

  @observable suppliers = [];

  @observable warehouses = [];

  @observable products = [];

  @observable productCategories = [];

  // Controllers.
  @observable isLoadingSearch = false;

  @observable isLoadingNextPage = false;

  @observable isLastPage = false;

  @observable deliveries = [];

  @observable warehouseId = undefined;

  @observable isCalendarView = false;

  @observable calendar = {
    month: THIS_MONTH,
    year: THIS_YEAR,
  }

  @observable filter = {
    pageNumber: 0,
    pageSize: 1024,
    status: [1, 2],
    period: 15,
    supplierId: undefined,
    warehouseId: undefined,
    productId: undefined,
    productCategoryId: undefined,
    received: false,
    notReceived: false,
  };

  constructor() {
    reaction(() => [
      this.filter.status,
      this.filter.period,
      this.filter.supplierId,
      this.filter.warehouseId,
      this.filter.productId,
      this.filter.productCategoryId,
      this.filter.received,
      this.filter.notReceived,
    ], () => this.searchFirstPage());

    reaction(() => this.filter.pageNumber, () => this.loadNextPage());
  }

  @action setStatus = (status) => this.filter.status = status;

  @action setPeriod = (period) => this.filter.period = period;

  @action setSupplier = (supplier) => this.filter.supplierId = supplier;

  @action setCalendar = ({ month, year }) => this.calendar = { month, year };

  @action setWarehouseId = (warehouseId) => this.filter.warehouseId = warehouseId;

  @action setProductId = (productId) => this.filter.productId = productId;

  @action toggleReceived =
    () => this.filter.received = !this.filter.received;

  @action toggleNotReceived =
    () => this.filter.notReceived = !this.filter.notReceived;

  @action setProductCategoryId =
    (productCategory) => this.filter.productCategoryId = productCategory;

  @action setNextPage = () => this.filter.pageNumber = this.filter.pageNumber + 1;

  @action setCalendarView = (value) => this.isCalendarView = value;

  search = () => getJson(
    `${API_ROOT}/deliveries/search`, {
      ...this.filter,
      status: this.filter.status.slice(),
    },
  ).then(({ data }) => data);

  mapDeliveries = (deliveries) => deliveries.map((delivery) => ({
    ...delivery,
    deliveryDate: new Date(delivery.deliveryDate),
    label: `ENTR${String(delivery.number).padStart(6, '0')}`,
    url: `/entregas/detalhes?id=${encodeURIComponent(delivery.id)}`,
  }))

  @action searchFirstPage = () => {
    this.isLoadingSearch = true;
    this.search().then((data) => {
      this.totalDeliveriesByStatus = data.totalDeliveriesByStatus;
      this.deliveries = this.mapDeliveries(data.deliveries);
      this.isLoadingSearch = false;
    });
  }

  @action searchNextPage = () => {
    this.isLoadingNextPage = true;
    this.search().then(({ deliveries }) => {
      if (deliveries && deliveries.length > 0) this.deliveries.push(this.mapDeliveries(deliveries));
      else this.isLastPage = true;
      this.isLoadingNextPage = false;
    });
  }

  loadSuppliers = () => {
    getJson(`${API_ROOT}/suppliers`)
      .then(({ data }) => {
        this.suppliers = data.map((supplier) => ({
          value: supplier.id,
          text: supplier.name,
        }));
      });
  }

  loadWarehouses = () => {
    getJson(`${API_ROOT}/warehouses`)
      .then(({ data }) => {
        this.warehouses = data.map((warehouse) => ({
          value: warehouse.id,
          text: warehouse.description,
        }));
      });
  }

  loadProducts = () => {
    getJson(`${API_ROOT}/products`)
      .then(({ data }) => {
        this.products = data.map((product) => ({
          value: product.id,
          text: product.description,
        }));
      });
  }

  loadProductCategories = () => {
    getJson(`${API_ROOT}/productCategories`)
      .then(({ data }) => {
        this.productCategories = data.map((category) => ({
          value: category.id,
          text: category.description,
        }));
      });
  }

  @action loadFilterData = () => {
    this.loadSuppliers();
    this.loadWarehouses();
    this.loadProducts();
    this.loadProductCategories();
  }
}

export default DeliveriesStore;
