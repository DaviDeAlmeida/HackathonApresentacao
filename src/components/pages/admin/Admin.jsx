/* eslint-disable react/jsx-props-no-spreading */
import React, { Component, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import axios from 'axios';

import { observer, inject } from 'mobx-react';
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
const OcorrenciaChamados = lazy(() => import('./ocorrenciaChamados/OcorrenciaChamados'));
const AberturaPorFechamento = lazy(() => import('./aberturaPorFechamento/AberturaPorFechamento'));


@inject('AppStore')
@observer
class Admin extends Component {
  UNSAFE_componentWillMount = () => { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  receiveFile = async (e) => {
    const { AppStore: { UserStore: { setLista } } } = this.props;

    debugger;

    const file = e.target.files[0];

    const formData = new FormData();

    formData.append('file', file);

    const res = await axios.post('https://localhost:44339/api/planilha/uploadplanilha', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    debugger;

    const dados = Object.keys(res.data.produtividade).map((key) => ({
      name: key,
      quantidade: res.data.produtividade[key],
    }));

    // this.setState({ lista: dados });

    setLista(dados);

    debugger;

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

          <div style={{ marginBottom: 20 }}>
            <input
              type="file"
              onChange={(e) => this.receiveFile(e)}
            />
          </div>

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
            Tempo médio de resolução
          </MenuItem>
          <MenuItem
            to={`${url}/aberturaxfechamento`}
            selected={pathname === `${url}/aberturaxfechamento`}
          >
            Abertura x Fechamento
          </MenuItem>
          <MenuItem
            to={`${url}/chamadosporocorrencia`}
            selected={pathname === `${url}/chamadosporocorrencia`}
          >
            Chamados por ocorrência
          </MenuItem>

        </Menu>
        <Divider />
        <Content>
          <Switch>
            <Route
              exact
              path={`${url}/produtividadeporoperador`}
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
              path={`${url}/aberturaxfechamento`}
              component={(props) => (
                <AberturaPorFechamento {...props} />
              )}
            />
            <Route
              exact
              path={`${url}/chamadosporocorrencia`}
              component={(props) => (
                <OcorrenciaChamados {...props} />
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
