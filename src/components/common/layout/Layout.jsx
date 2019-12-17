import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/Header';
import {
  Wrapper,
  Content,
} from './styles';

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    <Content>
      {children}
    </Content>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
