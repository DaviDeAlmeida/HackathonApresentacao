import { action, observable, reaction } from 'mobx';

import { API_ROOT } from '../settings';
import { getJson } from '../modules/httpsClient';

class OrdersStore {
  // Data.
  @observable orders = [];

  // Filter properties.
  @observable totalOrdersByStatus = [];

  @observable suppliers = [];

  @observable warehouses = [];

  @observable products = [];

  @observable productCategories = [];

  // Controllers.
  @observable isLoadingSearch = false;

  @observable isLoadingNextPage = false;

  @observable isLastPage = false;

  @observable selectedOrders = [];

  @observable warehouseId = undefined;

  @observable supplierId = undefined;

  @observable filter = {
    pageNumber: 0,
    pageSize: 1024,
    status: [1, 2],
    period: 15,
    supplierId: undefined,
    warehouseId: undefined,
    productId: undefined,
    productCategoryId: undefined,
    waitingConfirmation: false,
    firstDelivery: false,
    noAnswer: false,
    partiallyScheduled: false,
    recived: false,
    partiallyDelivered: false,
    partiallyNoAnswer: false,
    orderSort: 'LeadTime',
  };

  constructor() {
    reaction(() => [
      this.filter.status,
      this.filter.period,
      this.filter.supplierId,
      this.filter.warehouseId,
      this.filter.productId,
      this.filter.productCategoryId,
      this.filter.waitingConfirmation,
      this.filter.firstDelivery,
      this.filter.noAnswer,
      this.filter.partiallyScheduled,
      this.filter.recived,
      this.filter.partiallyDelivered,
      this.filter.partiallyNoAnswer,
      this.filter.orderSort,
    ], () => this.searchFirstPage());

    reaction(() => this.filter.pageNumber, () => this.loadNextPage());

    reaction(() => this.selectedOrders, (orders) => {
      if (orders.length < 1) {
        this.warehouseId = undefined;
        this.supplierId = undefined;
      }
    });
  }

  @action setStatus = (status) => this.filter.status = status;

  @action setPeriod = (period) => this.filter.period = period;

  @action setSupplier = (supplier) => this.filter.supplierId = supplier;

  @action setWarehouseId = (warehouseId) => this.filter.warehouseId = warehouseId;

  @action setProductId = (productId) => this.filter.productId = productId;

  @action setOrderSort = (orderSort) => this.filter.orderSort = orderSort;

  @action setProductCategoryId =
    (productCategory) => this.filter.productCategoryId = productCategory;

  @action toggleWaitingConfirmation =
    () => this.filter.waitingConfirmation = !this.filter.waitingConfirmation;

  @action toggleFirstDelivery =
    () => this.filter.firstDelivery = !this.filter.firstDelivery;

  @action toggleNoAnswer =
    () => this.filter.noAnswer = !this.filter.noAnswer;

  @action togglePartiallyScheduled =
    () => this.filter.partiallyScheduled = !this.filter.partiallyScheduled;

  @action toggleRecived =
    () => this.filter.recived = !this.filter.recived;

  @action togglePartiallyDelivered =
    () => this.filter.partiallyDelivered = !this.filter.partiallyDelivered;

  @action togglePartiallyNoAnswer =
    () => this.filter.partiallyNoAnswer = !this.filter.partiallyNoAnswer;

  @action reset = () => {
    this.selectedOrders = [];
  }

  @action setNextPage = () => this.filter.pageNumber = this.filter.pageNumber + 1;

  @action selectOrder = (id, warehouseId, supplierId) => {
    const index = this.selectedOrders.indexOf(id);
    if (index !== -1) {
      this.selectedOrders.splice(index, 1);
    } else {
      this.selectedOrders.push(id);
      this.warehouseId = warehouseId;
      this.supplierId = supplierId;
    }
  }

  search = () => getJson(
    `${API_ROOT}/orders/search`, {
      ...this.filter,
      status: this.filter.status.slice(),
    },
  ).then(({ data }) => data);

  @action searchFirstPage = () => {
    this.isLoadingSearch = true;
    this.search().then((data) => {
      this.totalOrdersByStatus = data.totalOrdersByStatus;
      this.orders = data.orders;
      this.isLoadingSearch = false;
    });
  }

  @action searchNextPage = () => {
    this.isLoadingNextPage = true;
    this.search().then((data) => {
      if (data.orders && data.orders.length > 0) this.orders.push(data.orders);
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

export default OrdersStore;
