import React from 'react';
import PropTypes from 'prop-types';

import {
  CheckboxStyled,
  Label,
} from './styles';

const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled,
}) => (
  <Label htmlFor={id}>
    <CheckboxStyled
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      hasLabel={!!label}
    />
    {label}
  </Label>
);

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  id: undefined,
  name: undefined,
  label: undefined,
  checked: undefined,
  onChange: undefined,
  disabled: false,
};

export default Checkbox;
