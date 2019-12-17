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
import StatusBadgeDelivery from '../../../common/statusBadge/deliveries/StatusBadgeDelivery';
import {
  Wrapper,
} from './styles';

const Summary = lazy(() => import('./summary/Summary'));
const Orders = lazy(() => import('./orders/Orders'));
const Deliveries = lazy(() => import('./history/History'));

@inject('AppStore')
@observer
class DeliveryDetails extends Component {

  UNSAFE_componentWillMount() { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount() {
    const {
      AppStore: {
        DeliveryDetailsStore: {
          load,
        },
      },
      location: {
        search,
      },
    } = this.props;

    const { id } = qs.parse(search.substring(1));

    load(id);
  }

  componentWillUnmount() {
    const {
      AppStore: {
        DeliveryDetailsStore: {
          reset,
        },
      },
    } = this.props;

    reset();
  }

  render() {

    const {
      AppStore: {
        DeliveryDetailsStore: {
          delivery: {
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
        label: 'Pedidos',
        content: <Orders {...this.props} />,
      },
      {
        label: 'Histórico',
        content: <Deliveries {...this.props} />,
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
              {status && <StatusBadgeDelivery status={status} />}
            </Fragment>
          )}
        >
          <Tabs tabs={tabs} />
        </Details>
      </Wrapper>
    );
  }

}

DeliveryDetails.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    DeliveryDetailsStore: PropTypes.shape(),
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeliveryDetails;
