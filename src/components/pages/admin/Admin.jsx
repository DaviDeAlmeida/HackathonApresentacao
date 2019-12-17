/* eslint-disable react/jsx-props-no-spreading */
import React, { Component, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { nextTick } from '../../../utils';
import { pageView } from '../../../analytics';
import PageLayout from '../../common/layout/pageLayout/PageLayout';

import {
  Menu,
  MenuItem,
  Divider,
  Content,
} from './styles';

const Users = lazy(() => import('./users/Users'));
const Warehouses = lazy(() => import('./warehouses/Warehouses'));

class Admin extends Component {
  UNSAFE_componentWillMount = () => { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  render() {
    const {
      match: {
        url,
      },
      location: {
        pathname,
      },
    } = this.props;

    return (
      <PageLayout url={url}>
        <Helmet>
          <title>Administração | AccuScheduler</title>
        </Helmet>
        <Menu>
          <MenuItem
            to={`${url}/usuarios`}
            selected={pathname === url || pathname === `${url}/usuarios`}
          >
            Usuários
          </MenuItem>
          <MenuItem
            to={`${url}/cds`}
            selected={pathname === `${url}/cds`}
          >
            Centros de distribuição
          </MenuItem>
          <MenuItem
            to={`${url}/notificacoes`}
            selected={pathname === `${url}/notificacoes`}
          >
            Notificações
          </MenuItem>
        </Menu>
        <Divider />
        <Content>
          <Switch>
            <Route
              exact
              path={url}
              component={(props) => (
                <Users {...props} />
              )}
            />
            <Route
              path={`${url}/usuarios`}
              component={(props) => (
                <Users {...props} />
              )}
            />
            <Route
              exact
              path={`${url}/cds`}
              component={(props) => (
                <Warehouses {...props} />
              )}
            />
          </Switch>
        </Content>
      </PageLayout>
    );
  }
}

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Admin;
