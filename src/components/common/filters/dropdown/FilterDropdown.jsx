import React from 'react';
import PropTypes from 'prop-types';

import { DropdownStyled } from './styles';

const FilterDropdown = ({
  label,
  search,
  clearable,
  value,
  options,
  onChange,
}) => (
  <DropdownStyled
    fluid
    selection
    label={label}
    search={search}
    clearable={clearable}
    value={value}
    options={options}
    onChange={onChange}
  />
);

FilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  search: PropTypes.bool,
  clearable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

FilterDropdown.defaultProps = {
  search: false,
  clearable: false,
  value: undefined,
  onChange: undefined,
};

export default FilterDropdown;
