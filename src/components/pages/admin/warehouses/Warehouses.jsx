import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../../../history';
import Scrollable from '../../../common/scrollable/Scrollable';
import Table from '../../../common/table/Table';
import Toolbar from '../../../common/toolbar/Toolbar';
import ToolbarButton from '../../../common/toolbar/button/ToolbarButton';
import AppLoader from '../../../common/appLoader/AppLoader';
import {
  Wrapper,
} from './styles';

@inject('AppStore')
@observer
class Warehouses extends Component {
  componentDidMount() {
    const {
      AppStore: {
        WarehouseStore: {
          loadWarehouses,
        },
      },
    } = this.props;

    loadWarehouses();
  }

  _buildRows = (warehouses) => warehouses.map((warehouse) => ({
    id: warehouse.id,
    columns: [
      {
        alignTo: 'start',
        content: <Link to={warehouse.url}>{warehouse.description}</Link>,
      },
      {
        content: `${warehouse.address.city} / ${warehouse.address.state}`,
      },
      {
        content: warehouse.totalReceivingDocks,
      },
      {
        alignTo: 'end',
        content: `${warehouse.capacity} itens`,
      },
    ],
  }))

  _buildHeader = () => ({
    columns: [
      {
        id: 'Descrição',
        alignTo: 'start',
        content: 'Descrição',
      },
      {
        id: 'Local',
        content: 'Local',
      },
      {
        id: 'Docas',
        content: 'Docas',
      },
      {
        id: 'Capacidade',
        alignTo: 'end',
        content: 'Capacidade',
      },
    ],
  })

  render() {
    const {
      AppStore: {
        WarehouseStore: {
          isLoading,
          warehouses,
        },
      },
    } = this.props;

    return (
      <Wrapper>
        {isLoading && <AppLoader />}
        <Scrollable>
          <Table header={this._buildHeader()} rows={this._buildRows(warehouses)} />
        </Scrollable>
        <Toolbar text={`${warehouses.length} CDs cadastrados`}>
          <ToolbarButton
            primary
            text="Novo"
            onClick={() => history.push('/admin/cds/novo')}
          />
        </Toolbar>
      </Wrapper>
    );
  }
}

Warehouses.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    WarehouseStore: PropTypes.shape(),
  }),
};

export default Warehouses;
