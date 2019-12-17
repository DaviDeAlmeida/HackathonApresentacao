import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line
import { Helmet } from 'react-helmet';
import qs from 'querystring';

import { pageView, sendEvent } from '../../../analytics';
import PageLayout from '../../common/layout/pageLayout/PageLayout';
import OrdersList from '../../common/ordersList/OrdersList';
import Filters from '../../sidebars/orders/filters/Filters';
import Notifications from '../../sidebars/orders/notifications/Notifications';
import OrdersStatus from '../../common/ordersStatus/OrdersStatus';
import Sidebar from '../../common/sidebar/Sidebar';
import AppLoader from '../../common/appLoader/AppLoader';
import Toolbar from '../../common/toolbar/Toolbar';
import ToolbarButton from '../../common/toolbar/button/ToolbarButton';
import history from '../../../history';
import Dropdown from '../../common/dropdown/Dropdown';

import { nextTick } from '../../../utils';

import {
  Main,
  Header,
  Sort,
  Options,
} from './styles';

@inject('AppStore')
@observer
class Orders extends Component {
  UNSAFE_componentWillMount = () => { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount = () => {
    const {
      AppStore: {
        OrdersStore: {
          searchFirstPage,
        },
      },
    } = this.props;

    searchFirstPage();
  }

  componentWillUnmount = () => {
    const {
      AppStore: {
        OrdersStore: {
          reset,
        },
      },
    } = this.props;

    reset();
  }

  render() {
    const {
      AppStore: {
        OrdersStore: {
          isLoadingSearch,
          isStatusOpen,
          setStatus,
          filter: {
            status,
            orderSort,
          },
          setOrderSort,
          totalOrdersByStatus,
          orders,
          supplierId,
          warehouseId,
          selectOrder,
          selectedOrders,
          clearSelectedOrders,
        },
      },
      match: {
        url,
      },
      isMobile,
    } = this.props;

    const onSidebarToggle = () => sendEvent('UI - Pedidos - LeftBar', 'Click - Left Bar', 'Detalhes do evento');

    const sortOptions = [
      {
        id: 'LeadTime',
        content: 'Leadtime',
      },
      {
        id: 'Status',
        content: 'Status',
      },
    ];

    return (
      <PageLayout url={url}>

        <Helmet>
          <title>Pedidos | AccuScheduler</title>
        </Helmet>

        {isLoadingSearch && (
          <AppLoader />
        )}

        <Sidebar afterToggle={onSidebarToggle}>
          <Filters />
        </Sidebar>

        <Main
          isMobile={isMobile}
        >
          <OrdersStatus
            isOpen={isStatusOpen}
            isMobile={isMobile}
            setStatus={setStatus}
            selectedStatus={status}
            totalOrdersByStatus={totalOrdersByStatus}
          />

          <Header>
            <Sort>
              Ordenar por:
              <Options>
                <Dropdown
                  value={orderSort}
                  onSelect={(id) => setOrderSort(id)}
                  items={sortOptions}
                />
              </Options>
            </Sort>
          </Header>

          <OrdersList
            orders={orders.slice()}
            select={selectOrder}
            selected={selectedOrders.slice()}
          />
        </Main>


        <Sidebar afterToggle={onSidebarToggle} right>
          <Notifications
            totalOrdersByStatus={totalOrdersByStatus}
          />
        </Sidebar>

        {selectedOrders && selectedOrders.length > 0 && (
          <Toolbar
            text={`${selectedOrders.length} pedidos selecionados.`}
            onCloseClick={clearSelectedOrders}
          >
            <ToolbarButton
              primary
              text="Agendar selecionados"
              onClick={() => history.push({
                pathname: '/agendamento',
                search: `?${qs.stringify({ supplierId, warehouseId, ids: selectedOrders.slice() })}`,
              })}
            />
          </Toolbar>
        )}
      </PageLayout>
    );

  }

}

Orders.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    OrdersStore: PropTypes.shape(),
  }),
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Orders;
