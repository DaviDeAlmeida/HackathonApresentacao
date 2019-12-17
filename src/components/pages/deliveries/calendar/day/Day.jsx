import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Content,
} from './styles';

const Day = ({ day, children }) => (
  <Container>
    <Header>{day}</Header>
    <Content>{children}</Content>
  </Container>
);

Day.propTypes = {
  day: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Day.defaultProps = {
  children: undefined,
};

export default Day;
