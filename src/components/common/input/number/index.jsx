import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout';

import {
  InputStyled,
} from './styles';

const InputNumber = ({
  label,
  width,
  value,
  onChange,
  readOnly,
  mandatory,
  name
}) => (
  <Layout
    width={width}
    label={label}
    mandatory={mandatory}
  >
    <InputStyled
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      type="number"
      name={name}
    />
  </Layout>
);

InputNumber.propTypes = {
  label: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  mandatory: PropTypes.bool,
};

InputNumber.defaultProps = {
  label: undefined,
  width: '100%',
  value: undefined,
  onChange: undefined,
  readOnly: false,
  mandatory: false,
};

export default InputNumber;
