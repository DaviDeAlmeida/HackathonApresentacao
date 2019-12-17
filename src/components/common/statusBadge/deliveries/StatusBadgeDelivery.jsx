import React from 'react';
import PropTypes from 'prop-types';

import { statusText, getStatus } from '../../../../helpers/DeliveriesStatus';
import { Span } from './styles';

const StatusBadgeDelivery = ({ status }) => {

  const text = statusText[getStatus(status)];

  return (
    <Span status={getStatus(status)}>{text}</Span>
  );

};

StatusBadgeDelivery.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

StatusBadgeDelivery.defaultProps = {
  status: undefined,
};

export default StatusBadgeDelivery;
