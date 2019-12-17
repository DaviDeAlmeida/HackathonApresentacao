/* eslint-disable react/jsx-props-no-spreading */
import React, {
  Component,
  Suspense,
  lazy,
} from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import history from '../history';
import AppLoader from './common/appLoader/AppLoader';
import Layout from './common/layout/Layout';
import SignInCallback from './common/auth/signInCallback/SignInCallback';
import SignInSilentCallback from './common/auth/signInSilentCallback/SignInSilentCallback';
import { initializeGA } from '../analytics';
import { isMobileDevice } from '../utils';
import { roles } from '../modules/auth';

// Routes
const Orders = lazy(() => import('./pages/orders/Orders'));
const Deliveries = lazy(() => import('./pages/deliveries/Deliveries'));
const Occupancy = lazy(() => import('./pages/occupancy/Occupancy'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const Scheduling = lazy(() => import('./pages/scheduling/Scheduling'));
const Rescheduling = lazy(() => import('./pages/scheduling/rescheduling/Rescheduling'));
const DeliveryDetails = lazy(() => import('./pages/deliveries/details/DeliveryDetails'));
const OrderDetails = lazy(() => import('./pages/orders/details/OrderDetails'));
const UserDetails = lazy(() => import('./pages/admin/users/details/UserDetails'));
const WarehouseDetails = lazy(() => import('./pages/admin/warehouses/details/WarehouseDetails'));

@inject('AppStore')
@observer
class Routes extends Component {
  componentDidMount = () => {
    initializeGA();
  }

  render() {
    const {
      AppStore: {
        AuthStore: {
          loadUser,
          isAuthenticated,
          signInRedirect,
          signInRedirectCallback,
          signInSilentCallback,
        },
      },
    } = this.props;

    if (!isAuthenticated) {
      if (window.location.pathname.indexOf('/signin-redirect') !== -1) return <SignInCallback {...{ signInRedirectCallback }} />;
      if (window.location.pathname.indexOf('/silent-renew') !== -1) return <SignInSilentCallback {...{ signInSilentCallback }} />;

      loadUser().then((user) => {
        if (!user || user.expired) signInRedirect();
      });

      return <AppLoader />;
    }

    const isMobile = Boolean(isMobileDevice);
    const {
      AppStore: {
        AuthStore: {
          user: {
            profile: {
              role,
            },
          },
        },
      },
    } = this.props;

    return (
      <Router history={history}>
        <Suspense fallback={AppLoader()}>
          <Layout>
            <Switch>
              <Route
                exact
                path={['/', '/pedidos']}
                component={(props) => (
                  <Orders {...{ ...props, isMobile }} />
                )}
              />
              <Route
                exact
                path="/entregas"
                component={(props) => (
                  <Deliveries {...{ ...props, isMobile }} />
                )}
              />
              <Route
                exact
                path="/agendamento"
                component={(props) => (
                  <Scheduling {...{ ...props, isMobile }} />
                )}
              />
              <Route
                exact
                path="/reagendamento"
                component={(props) => (
                  <Rescheduling {...{ ...props, isMobile }} />
                )}
              />
              <Route
                exact
                path="/entregas/detalhes"
                component={(props) => (
                  <DeliveryDetails {...{ ...props, isMobile }} />
                )}
              />
              <Route
                exact
                path="/pedidos/detalhes"
                component={(props) => (
                  <OrderDetails {...{ ...props, isMobile }} />
                )}
              />
              {role !== roles.supplier && (
                <Route
                  exact
                  path="/ocupacao"
                  component={(props) => (
                    <Occupancy {...{ ...props, isMobile }} />
                  )}
                />
              )}
              {role === roles.admin && (
                <Switch>
                  <Route
                    exact
                    path="/admin/usuarios/detalhes"
                    component={(props) => (
                      <UserDetails {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/admin/cds/detalhes"
                    component={(props) => (
                      <WarehouseDetails {...{ ...props, isMobile }} />
                    )}
                  />
                  <Route
                    path="/admin"
                    component={(props) => (
                      <Admin {...{ ...props, isMobile }} />
                    )}
                  />
                </Switch>
              )}
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    );
  }
}

Routes.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default Routes;
