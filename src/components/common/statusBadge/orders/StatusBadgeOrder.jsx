import React from 'react';
import PropTypes from 'prop-types';

import { statusText, getStatus } from '../../../../helpers/OrdersStatus';
import { Span } from './styles';

const StatusBadgeOrder = ({ status }) => (
  <Span status={getStatus(status)}>
    {statusText[getStatus(status)]}
  </Span>
);

StatusBadgeOrder.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
};

export default StatusBadgeOrder;
