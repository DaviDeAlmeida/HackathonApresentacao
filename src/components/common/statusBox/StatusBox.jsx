import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Title,
  Quantity,
} from './styles';

const StatusBox = ({
  color,
  label,
  quantity,
  selected,
  onClick,
}) => (
  <Box
    color={color}
    selected={selected}
    onClick={onClick}
  >
    <Title>{label}</Title>
    <Quantity>{quantity}</Quantity>
  </Box>
);

StatusBox.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

StatusBox.defaultProps = {
  quantity: 0,
  selected: false,
  onClick: undefined,
};

export default StatusBox;
