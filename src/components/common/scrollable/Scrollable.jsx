import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
} from './styles';

const Scrollable = ({ children }) => (
  <Container>{children}</Container>
);

Scrollable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Scrollable;

export {
  Container,
};
