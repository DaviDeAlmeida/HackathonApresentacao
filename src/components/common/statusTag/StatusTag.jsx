import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledLabel,
} from './styles';

const StatusTag = ({ text, status, onClick }) => (
  <StyledLabel
    status={status}
    onClick={onClick}
    pointer={onClick !== undefined}
  >
    {text}
  </StyledLabel>
);

StatusTag.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

StatusTag.defaultProps = {
  onClick: undefined,
};

export default StatusTag;
