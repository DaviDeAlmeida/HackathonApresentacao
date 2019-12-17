import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyled } from './styles';

const ToolbarButton = ({
  text,
  onClick,
  primary,
  disabled,
}) => (
  <ButtonStyled
    onClick={disabled ? undefined : onClick}
    primary={primary}
    disabled={disabled}
  >
    {text}
  </ButtonStyled>
);

ToolbarButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
};

ToolbarButton.defaultProps = {
  text: undefined,
  onClick: undefined,
  primary: false,
  disabled: false,
};

export default ToolbarButton;
