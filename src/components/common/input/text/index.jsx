import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout';
import {
  InputStyled,
} from '../styles';

const Input = ({
  width,
  label,
  value,
  onChange,
  readOnly,
  mandatory,
  onKeyPress,
  name,
  className,
  autoFocus,
}) => (
  <Layout
    width={width}
    label={label}
    mandatory={mandatory}
  >
    <InputStyled
      value={value || undefined}
      onChange={onChange}
      readOnly={readOnly}
      onKeyPress={onKeyPress}
      name={name}
      className={className}
      autoFocus={autoFocus}
    />
  </Layout>
);

Input.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  mandatory: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  width: '100%',
  label: undefined,
  value: undefined,
  onChange: undefined,
  readOnly: false,
  mandatory: false,
  autoFocus: false,
};

export default Input;
