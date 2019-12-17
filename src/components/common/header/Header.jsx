import React from 'react';

import GlobalSearch from './globalSearch/GlobalSearch';
import UserContext from './userContext/UserContext';
import history from '../../../history';

import {
  Wrapper,
  Container,
  Logo,
} from './styles';

import LogoDelage from '../header/logodelage.png';

const Header = () => (
  <Wrapper>
    <Container>
      {/* <Logo onClick={() => history.push('/')} /> */}
      <img src={LogoDelage} style={{width: '210px'}} />
      {/* <GlobalSearch />
      <UserContext /> */}
    </Container>
  </Wrapper>
);

export default Header;
