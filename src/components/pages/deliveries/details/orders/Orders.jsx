import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import OrdersList from '../../../../common/ordersList/OrdersList';

@inject('AppStore')
@observer
class Orders extends Component {
  componentDidMount() {
    const {
      AppStore: {
        DeliveryDetailsStore: {
          orders,
          loadOrders,
        },
      },
    } = this.props;

    if (!orders || orders.length < 1) loadOrders();
  }

  render() {
    const {
      AppStore: {
        DeliveryDetailsStore: {
          orders,
        },
      },
    } = this.props;

    return (
      <OrdersList orders={orders.slice()} />
    );
  }
}

Orders.propTypes = {
  AppStore: PropTypes.shape({
    DeliveryDetailsStore: PropTypes.shape(),
  }),
};

Orders.defaultProps = {
  AppStore: undefined,
};

export default Orders;
