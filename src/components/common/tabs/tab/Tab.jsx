import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
} from './styles';

const Tab = ({ label, active, onClick }) => (
  <Wrapper
    active={active}
    onClick={() => !active && onClick(label)}
  >
    {label}
  </Wrapper>
);

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
