import AuthStore from './AuthStore';
import NotificationStore from './NotificationStore';
import GlobalStore from './GlobalStore';
import OrdersStore from './OrdersStore';
import SchedulerStore from './SchedulerStore';
import DeliveriesStore from './DeliveriesStore';
import DeliveryDetailsStore from './DeliveryDetailsStore';
import OrderDetailsStore from './OrderDetailsStore';
import UserStore from './UserStore';
import OccupancyStore from './OccupancyStore';
import WarehouseStore from './WarehouseStore';

class AppStore {
  constructor() {
    this.OrdersStore = new OrdersStore();
    this.AuthStore = new AuthStore();
    this.NotificationStore = NotificationStore;
    this.GlobalStore = new GlobalStore();
    this.SchedulerStore = new SchedulerStore();
    this.DeliveriesStore = new DeliveriesStore();
    this.DeliveryDetailsStore = new DeliveryDetailsStore();
    this.OrderDetailsStore = new OrderDetailsStore();
    this.UserStore = new UserStore();
    this.OccupancyStore = new OccupancyStore();
    this.WarehouseStore = new WarehouseStore();
  }
}

const store = new AppStore();

export default store;
