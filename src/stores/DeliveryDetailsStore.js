/* eslint-disable no-unused-vars */
import { action, observable, reaction } from 'mobx';
import { API_ROOT } from '../settings';
import { getJson, postJson } from '../modules/httpsClient';

import notificationStore from './NotificationStore';
import history from '../history';
import colors from '../colors';

class DeliveryDetailsStore {
  // data
  @observable delivery = {
    lines: [],
    orders: [],
  };

  @observable warehouse = undefined;

  @observable supplier = undefined;

  @observable recivedBy = undefined;

  @observable voucherDetails = undefined;

  @observable orders = [];

  // controllers
  @observable isLoading = false;

  @action reset = () => {
    this.delivery = {
      lines: [],
      orders: [],
    };

    this.warehouse = undefined;
    this.supplier = undefined;
    this.recivedBy = undefined;
    this.voucherDetails = undefined;
    this.orders = [];
  }

  @action load = (id) => {
    this.isLoading = true;

    getJson(`${API_ROOT}/deliveries/${encodeURIComponent(id)}`).then(({ data }) => {
      this.delivery = data.delivery;
      this.warehouse = data.warehouse;
      this.supplier = data.supplier;
      this.recivedBy = data.user;
      this.isLoading = false;
    });
  }

  @action loadOrders = () => {
    this.isLoading = true;

    getJson(`${API_ROOT}/orders/by-delivery-id/${encodeURIComponent(this.delivery.id)}`)
      .then(({ data }) => {
        this.orders = data;
        this.isLoading = false;
      });
  }

  @action confirm = (id) => {
    this.isLoading = true;

    postJson(`${API_ROOT}/deliveries/confirm?id=${encodeURIComponent(id)}`).then(({ errors }) => {
      this.isLoading = false;
      history.push('/entregas');
    });
  }

  @action refuse = (id) => {
    this.isLoading = true;
    postJson(`${API_ROOT}/deliveries/refuse?id=${encodeURIComponent(id)}`).then(({ errors }) => {
      this.isLoading = false;
      history.push('/entregas');
    });
  }

  @action confirmReceipt = (qrCode) => {

    if (!qrCode) {
      notificationStore.broadcast({
        id: 'Código em branco.',
        payload: 'Código em branco.',
        color: colors.error,
      });
    } else {
      postJson(`${API_ROOT}/deliveries/confirm-receipt?id=${encodeURIComponent(qrCode)}`).then(({ errors }) => {
        this.isLoading = false;

        errors.forEach((error) => {
          notificationStore.broadcast({
            id: error,
            payload: error,
            color: colors.error,
          });
        });

        if (!errors || errors.length === 0) {
          notificationStore.broadcast({
            id: 'Entrega recebida com sucesso.',
            payload: 'Entrega recebida com sucesso.',
            color: colors.success,
          });
        }
        this.resetVoucherDetails();
      });
    }
  }

  @action loadVoucherDetails = (id) => {
    this.isLoading = true;
    if (id) {
      getJson(`${API_ROOT}/deliveries/voucher-receipt-details/${id}`).then(({ data, errors }) => {
        this.voucherDetails = data;

        if (errors) {
          errors.forEach((error) => {
            notificationStore.broadcast({
              id: error,
              payload: error,
              color: colors.error,
            });
          });
        }
      });
    }
  }

  resetVoucherDetails = () => {
    this.voucherDetails = undefined;
  }
}

export default DeliveryDetailsStore;
