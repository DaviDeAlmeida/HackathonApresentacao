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

// const Users = lazy(() => import('./users/Users'));
// const Warehouses = lazy(() => import('./warehouses/Warehouses'));

const Produtividade = lazy(() => import('./produtividadePorOperador/Produtividade'));
const TempoMedioResolucao = lazy(() => import('./tempoMedioResolucao/TempoMedioResolucao'));

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
          <title>Hackathon 2019</title>
        </Helmet>
        <Menu>
          {/* <MenuItem
            to={`${url}/usuarios`} // Produtividade por operador
            selected={pathname === url || pathname === `${url}/usuarios`}
          >
            Produtividade por operador
          </MenuItem>
          <MenuItem
            to={`${url}/cds`} // Abertura x Resolução
            selected={pathname === `${url}/cds`}
          >
            Abertura x Resolução
          </MenuItem> */}
          <MenuItem
            to={`${url}/produtividadeporoperador`} // Produtividade por operador
            selected={pathname === url || pathname === `${url}/produtividadeporoperador`}
          >
            Produtividade por operador
          </MenuItem>
          <MenuItem
            to={`${url}/tempomedioresolucao`} // Abertura x Resolução
            selected={pathname === `${url}/tempomedioresolucao`}
          >
            Abertura x Resolução
          </MenuItem>
          <MenuItem
            to={`${url}/aberturaxresolucao`}
            selected={pathname === `${url}/aberturaxresolucao`}
          >
            Tempo médio de resolução
          </MenuItem>
          <MenuItem
            to={`${url}/tempomedioresolucao`}
            selected={pathname === `${url}/tempomedioresolucao`}
          >
            Demanda diária
          </MenuItem>
        </Menu>
        <Divider />
        <Content>
          <Switch>
            <Route
              exact
              path={url}
              component={(props) => (
                <Produtividade {...props} />
              )}
            />
            <Route
              path={`${url}/tempomedioresolucao`}
              component={(props) => (
                <TempoMedioResolucao {...props} />
              )}
            />
            <Route
              exact
              path={`${url}/cds`}
              component={(props) => (
                <Produtividade {...props} />
              )}
            />
            <Route
              exact
              path={`${url}/cds`}
              component={(props) => (
                <Produtividade {...props} />
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
