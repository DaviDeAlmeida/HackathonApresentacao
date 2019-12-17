import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Title,
} from './styles';

const Card = ({ title, children }) => (
  <Container>
    {title && (
      <Title>{title}</Title>
    )}
    {children}
  </Container>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Card.defaultProps = {
  title: undefined,
};

export default Card;
