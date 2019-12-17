import { observable, action } from 'mobx';
import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnectionState,
} from '@aspnet/signalr';

import { API_ORIGIN } from '../settings';

class NotificationStore {

  @observable connection;

  @observable notifications = [];

  @observable pushNotifications = [];

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${API_ORIGIN}/notifications`, {
        transport: HttpTransportType.LongPolling,
        accessTokenFactory: () => localStorage.getItem('access_token'),
      })
      .build();

    this.connection.on('broadcast', this.onBroadcast);
  }

  @action connect =
   () => this.connection.state === HubConnectionState.Disconnected && this.connection.start();


  @action remove = (id) => {
    const index = this.pushNotifications.findIndex((notification) => notification.id === id);
    this.pushNotifications.splice(index, 1);
  }

  @action onBroadcast = (notification) => {
    this.broadcast(notification);
    this.notifications.push(notification);
  }

  @action broadcast = (notification, delay = 5000) => {
    const data = notification.id
      ? notification
      : {
        ...notification,
        id: notification.payload,
      };

    this.pushNotifications.push(data);

    setTimeout(() => {
      this.remove(data.id);
    }, delay);
  }

  @action load = () => {
    this.notifications = [];
  }
}

export default new NotificationStore();
