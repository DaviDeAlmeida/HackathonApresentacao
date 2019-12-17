import React from 'react';
import PropTypes from 'prop-types';
import history from '../../../../history';

import {
  Wrapper,
  GoBack,
} from './styles';

const Header = ({ children }) => (
  <Wrapper>
    <GoBack onClick={() => history.goBack()} />
    {children}
  </Wrapper>
);

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Header.defaultProps = {
  children: undefined,
};

export default Header;
