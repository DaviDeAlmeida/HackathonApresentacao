import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout';
import Dropdown from '../../dropdown/Dropdown';
import {
  CustomSelect,
} from './styles';

const Select = ({
  width,
  label,
  value,
  onChange,
  options,
  mandatory,
}) => (
  <Layout
    width={width}
    label={label}
    mandatory={mandatory}
  >
    <Dropdown
      customSelect={<CustomSelect>{value}</CustomSelect>}
      items={options.map((opt) => ({
        id: opt.value,
        content: opt.text,
      }))}
      value={value}
      onSelect={onChange}
    />
  </Layout>
);

Select.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.node.isRequired,
  })),
  mandatory: PropTypes.bool,
};

Select.defaultProps = {
  width: '100%',
  label: undefined,
  value: undefined,
  onChange: undefined,
  options: [],
  mandatory: false,
};

export default Select;
