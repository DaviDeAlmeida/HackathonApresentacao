import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import List from '../../../../common/deliveriesList/DeliveriesList';


@inject('AppStore')
@observer
class Deliveries extends Component {

  componentDidMount() {
    const {
      AppStore: {
        OrderDetailsStore: {
          deliveries,
          loadDeliveries,
        },
      },
    } = this.props;

    if (!deliveries || deliveries.length < 1) loadDeliveries();
  }

  render() {
    const {
      AppStore: {
        OrderDetailsStore: {
          deliveries,
        },
      },
    } = this.props;

    return (
      <List deliveries={deliveries.slice()} />
    );
  }

}

Deliveries.propTypes = {
  AppStore: PropTypes.shape({
    OrderDetailsStore: PropTypes.shape(),
  }),
};

Deliveries.defaultProps = {
  AppStore: undefined,
};
export default Deliveries;
