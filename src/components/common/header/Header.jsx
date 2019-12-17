import React from 'react';

import GlobalSearch from './globalSearch/GlobalSearch';
import UserContext from './userContext/UserContext';
import history from '../../../history';

import {
  Wrapper,
  Container,
  Logo,
} from './styles';

const Header = () => (
  <Wrapper>
    <Container>
      <Logo onClick={() => history.push('/')} />
      <GlobalSearch />
      <UserContext />
    </Container>
  </Wrapper>
);

export default Header;
