import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from '../table/Table';
import Checkbox from '../checkbox/Checkbox';
import TableContent from '../table/tableContent/TableContent';
import StatusBadgeOrder from '../statusBadge/orders/StatusBadgeOrder';
import LeadTimeIndicator from '../leadTimeIndicator/LeadTimeIndicator';
import { getStatus } from '../../../helpers/OrdersStatus';
import Scrollable from '../scrollable/Scrollable';

const buildRows = (orders, selected, select) => orders.map((order) => ({
  id: order.id,
  status: getStatus(order.status),
  columns: [
    ...(
      selected && select ? [
        {
          id: `${order.id}-check`,
          maxWidth: '24px',
          content: <Checkbox
            id={order.id}
            name={order.id}
            checked={selected.includes(order.id)}
            onChange={() => select(order.id, order.warehouseId, order.supplierId)}
          />,
        },
      ] : []
    ),
    {
      id: `${order.id}-info`,
      alignTo: 'start',
      maxWidth: '45%',
      content: <TableContent
        title={<Link to={`/pedidos/detalhes?id=${encodeURIComponent(order.id)}`}>{order.externalId}</Link>}
        secondaryContent={[`${order.deliveriesCount} entrega(s)`, `${order.itemsCount} item(ns)`, `${order.totalQuantities} unidade(s)`, `${order.totalVolumes} volume(s)`]}
      />,
    },
    {
      id: `${order.id}-warehouse`,
      alignTo: 'start',
      maxWidth: '15%',
      content: <TableContent
        title="Grupo DPSP"
        secondaryContent={[order.warehouse]}
      />,
    },
    {
      id: `${order.id}-status`,
      maxWidth: '20%',
      content: <StatusBadgeOrder status={order.status} />,
    },
    {
      id: `${order.id}-leadtime`,
      maxWidth: '20%',
      content: <LeadTimeIndicator
        leadTime={new Date(order.leadTime)}
        status={order.status}
      />,
    },
  ],
}));

const OrdersList = ({ orders, selected, select }) => (
  <Scrollable>
    <Table rows={buildRows(orders, selected, select)} />
  </Scrollable>
);

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    externalId: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    supplierId: PropTypes.string.isRequired,
    warehouse: PropTypes.string.isRequired,
    warehouseId: PropTypes.string.isRequired,
    itemsCount: PropTypes.number.isRequired,
    deliveriesCount: PropTypes.number.isRequired,
    leadTime: PropTypes.string.isRequired,
  })).isRequired,
  select: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.string),
};

OrdersList.defaultProps = {
  select: undefined,
  selected: undefined,
};

export default OrdersList;
