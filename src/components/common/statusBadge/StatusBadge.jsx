import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from './styles';

const StatusBadge = ({ color, status }) => (
  <Badge color={color}>
    {status}
  </Badge>
);

StatusBadge.propTypes = {
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
