import React from 'react';
import PropTypes from 'prop-types';

import Header from './header/Header';
import Scrollable from '../scrollable/Scrollable';
import {
  Wrapper,
  Content,
} from './styles';

const Details = ({ header, children }) => (
  <Wrapper>
    <Header>{header}</Header>
    <Content>
      <Scrollable>
        {children}
      </Scrollable>
    </Content>
  </Wrapper>
);

Details.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Details.defaultProps = {
  header: undefined,
  children: undefined,
};

export default Details;
