import { action, observable, reaction } from 'mobx';
import { THIS_MONTH, THIS_YEAR } from '../modules/calendar';
import { getJson } from '../modules/httpsClient';
import { API_ROOT } from '../settings';

class OccupancyStore {
  // Data.
  @observable occupancy = [];

  // Controllers.
  @observable isLoading = false;

  @observable selectedDate = new Date();

  @action setSelectedDate = (date) => this.selectedDate = date;

  @observable selectedPeriod = {
    month: THIS_MONTH,
    year: THIS_YEAR,
  };

  @action setSelectedPeriod = (period) => this.selectedPeriod = period;

  @observable warehouses = [];

  @observable warehouseId = undefined;

  constructor() {
    reaction(() => [
      this.selectedPeriod,
      this.warehouseId,
    ], this.loadOccupancy);
  }

  @action load = () => {
    this.loadWarehouses();
  }

  @action loadOccupancy = () => {
    this.isLoading = true;
    getJson(`${API_ROOT}/warehouses/occupancy-by-month`, {
      ...this.selectedPeriod,
      warehouseId: this.warehouseId,
    }).then(({ data }) => {
      this.isLoading = false;
      this.occupancy = [];
      this.occupancy = data.map((day) => ({
        ...day,
        date: new Date(day.date),
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
        this.setWarehouseId(data[0].id);
      });
  }

  @action setWarehouseId = (warehouseId) => {
    this.warehouseId = warehouseId;
  }
}

export default OccupancyStore;
