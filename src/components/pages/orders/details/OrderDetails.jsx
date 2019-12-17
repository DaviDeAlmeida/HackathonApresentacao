/* eslint-disable react/jsx-props-no-spreading */
import React, { Component, lazy, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { Helmet } from 'react-helmet';

import { nextTick } from '../../../../utils';
import { pageView } from '../../../../analytics';
import AppLoader from '../../../common/appLoader/AppLoader';
import Details from '../../../common/details/Details';
import Tabs from '../../../common/tabs/Tabs';
import StatusBadgeOrder from '../../../common/statusBadge/orders/StatusBadgeOrder';
import {
  Wrapper,
} from './styles';

const Summary = lazy(() => import('./summary/Summary'));
const Deliveries = lazy(() => import('./deliveries/Deliveries'));
const Orders = lazy(() => import('./history/History'));


@inject('AppStore')
@observer
class OrderDetails extends Component {

  UNSAFE_componentWillMount() { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount() {
    const {
      AppStore: {
        OrderDetailsStore: {
          load,
          loadQuantitiesByStatus,
        },
      },
      location: {
        search,
      },
    } = this.props;

    const { id } = qs.parse(search.substring(1));

    load(id);
    loadQuantitiesByStatus(id);
  }

  componentWillUnmount() {
    const {
      AppStore: {
        OrderDetailsStore: {
          reset,
        },
      },
    } = this.props;

    reset();
  }

  render() {

    const {
      AppStore: {
        OrderDetailsStore: {
          order: {
            label,
            status,
          },
          isLoading,
        },
      },
    } = this.props;

    const tabs = [
      {
        label: 'Resumo',
        content: <Summary {...this.props} />,
      },
      {
        label: 'Entregas',
        content: <Deliveries {...this.props} />,
      },
      {
        label: 'Histórico',
        content: <Orders {...this.props} />,
      },
    ];

    return (
      <Wrapper>
        <Helmet>
          <title>{`${label} | AccuScheduler`}</title>
        </Helmet>

        {isLoading && <AppLoader />}

        <Details
          header={(
            <Fragment>
              <div>{label}</div>
              {status && <StatusBadgeOrder status={status} />}
            </Fragment>
          )}
        >
          <Tabs tabs={tabs} />
        </Details>
      </Wrapper>
    );
  }
}

OrderDetails.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    OrderDetailsStore: PropTypes.shape(),
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderDetails;
