import { observable, action } from 'mobx';
import { getJson } from '../modules/httpsClient';
import { API_ROOT } from '../settings';

class WarehouseStore {
  // Data.
  @observable warehouse = {};

  @observable warehouses = [];

  // Controllers.
  @observable isLoading = false;

  @action reset = () => {
    this.warehouse = {};
  }

  @action loadWarehouses = () => {
    this.isLoading = true;
    getJson(`${API_ROOT}/warehouses`).then(({ data: warehouses }) => {
      this.warehouses = warehouses.map((warehouse) => ({
        ...warehouse,
        url: `/admin/cds/detalhes?id=${encodeURIComponent(warehouse.id)}`,
      }));
      this.isLoading = false;
    });
  }

  @action loadWarehouse = (id) => {
    this.isLoading = true;
    getJson(`${API_ROOT}/warehouses/${encodeURIComponent(id)}`).then(({ data }) => {
      this.warehouse = data;
      this.isLoading = false;
    });
  }

  @action setWarehouseProp = (prop, value) => {
    this.warehouse = {
      ...this.warehouse,
      [prop]: value,
    };
  };

  @action setAddress = (prop, value) => {
    this.warehouse = {
      ...this.warehouse,
      address: {
        ...this.warehouse.address,
        [prop]: value,
      },
    };
  }

  @action addInterval = (interval) => {
    this.warehouse.intervals.push(interval);
  }
}

export default WarehouseStore;
