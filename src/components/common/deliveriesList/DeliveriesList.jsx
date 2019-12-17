import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from '../table/Table';
import TableContent from '../table/tableContent/TableContent';
import StatusBadgeDelivery from '../statusBadge/deliveries/StatusBadgeDelivery';
import Scrollable from '../scrollable/Scrollable';
import { getStatus } from '../../../helpers/DeliveriesStatus';
import { getDateFormated } from '../../../modules/calendar';
import { Info, StrongInfo } from './styles';

const getDeliveryTime = ({ deliveryDate: date, deliveryInterval: { begin, end } }) => {
  const day = getDateFormated(new Date(date));
  const interval = `${begin.slice(0, 2)}h - ${end.slice(0, 2)}h`;
  return `${day}, ${interval}`;
};

const buildContent = (deliveries) => deliveries.map((delivery) => ({
  id: delivery.id,
  status: getStatus(delivery.status),
  columns: [

    {
      maxWidth: '45%',
      content: <TableContent
        title={<Link to={delivery.url}>{delivery.label}</Link>}
        secondaryContent={[`${delivery.ordersCount} pedido(s)`, `${delivery.itemsCount} item(ns)`, `${delivery.totalQuantities} unidade(s)`, `${delivery.totalVolumes} volume(s)`]}
        pushTo="left"
      />,
    },
    {
      maxWidth: '15%',
      content: <TableContent
        title={delivery.supplier}
        secondaryContent={[delivery.warehouse]}
        textToRight
      />,
    },
    {
      maxWidth: '20%',
      content: <StatusBadgeDelivery status={delivery.status} />,
    },
    {
      alignTo: 'end',
      maxWidth: '20%',
      content: delivery.status === 1
        ? <StrongInfo>Pré-reservado para {getDeliveryTime(delivery)}</StrongInfo>
        : <Info>{getDeliveryTime(delivery)}</Info>,
    },
  ],
}));

const DeliveriesList = ({ deliveries }) => (
  <Scrollable>
    <Table
      rows={buildContent(deliveries)}
    />
  </Scrollable>
);

DeliveriesList.propTypes = {
  deliveries: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    ordersCount: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    supplier: PropTypes.string.isRequired,
    warehouse: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    deliveryDate: PropTypes.instanceOf(Date).isRequired,
  })).isRequired,
};

export default DeliveriesList;
