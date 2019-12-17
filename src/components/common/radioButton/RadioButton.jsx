import React from 'react';
import PropTypes from 'prop-types';

import {
  Label,
  RadioButtonStyled,
} from './styles';

const RadioButton = ({
  id,
  name,
  label,
  checked,
  onChange,
}) => (
  <Label htmlFor={id}>
    <RadioButtonStyled
      type="radio"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      hasLabel={!!label}
    />
    {label}
  </Label>
);

RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

RadioButton.defaultProps = {
  id: undefined,
  name: undefined,
  label: undefined,
  checked: undefined,
  onChange: undefined,
};

export default RadioButton;
