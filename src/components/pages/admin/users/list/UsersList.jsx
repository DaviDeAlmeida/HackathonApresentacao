import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from '../../../../common/table/Table';
import Scrollable from '../../../../common/scrollable/Scrollable';
import { nextTick } from '../../../../../utils';
import { pageView } from '../../../../../analytics';
import Toolbar from '../../../../common/toolbar/Toolbar';
import ToolbarButton from '../../../../common/button/Button';
import history from '../../../../../history';
import AppLoader from '../../../../common/appLoader/AppLoader';

import {
  Container,
  Content,
} from './styles';

@inject('AppStore')
@observer
class UsersList extends Component {
  UNSAFE_componentWillMount() { // eslint-disable-line camelcase
    nextTick(pageView);
  }

  componentDidMount() {
    const {
      AppStore: {
        UserStore: {
          loadAll,
        },
      },
    } = this.props;

    loadAll();
  }

  _buildHeader = () => ({
    columns: [
      {
        id: 'Email',
        maxWidth: '60%',
        content: 'Email',
        alignTo: 'start',

      },
      {
        id: 'Perfil',
        maxWidth: '20%',
        content: 'Perfil',
      },
      {
        id: 'ID externo',
        maxWidth: '20%',
        content: 'ID Externo',
      },
    ],
  });

  _buildRows = (users) => users.map((user) => ({
    id: user.id,
    columns: [
      {
        id: user.email,
        maxWidth: '60%',
        content: <Link to={`/admin/usuarios/detalhes?id=${encodeURIComponent(user.id)}`}>{user.email}</Link>,
        alignTo: 'start',
      },
      {
        id: user.role,
        maxWidth: '20%',
        content: user.roleName,
      },
      {
        id: user.externalId,
        maxWidth: '20%',
        content: user.externalId,
      },
    ],
  }));

  render() {
    const {
      AppStore: {
        UserStore: {
          isLoading,
          users,
        },
      },
    } = this.props;

    return (
      <Container>
        {isLoading && <AppLoader />}
        <Content>
          <Scrollable>
            <Table header={this._buildHeader()} rows={this._buildRows(users)} />
          </Scrollable>
        </Content>
        <Toolbar text={`${users.length} Usuários cadastrados`}>
          <ToolbarButton
            primary
            text="Novo"
            onClick={() => history.push({ pathname: '/admin/usuarios/novo' })}
          />
        </Toolbar>
      </Container>
    );
  }
}

UsersList.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default UsersList;
