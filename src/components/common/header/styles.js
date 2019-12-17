import styled from 'styled-components';
import colors from '../../../colors';

import logo from './logodelage.png';

const Wrapper = styled.header`
  display: flex;
  flex: 0 0 180px;
  height: 180px;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-image: linear-gradient(${colors.blueA}, ${colors.blueB})
`;

const Container = styled.div`
  display: flex;
  flex: 0 0 80px;
  height: 80px;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

const Logo = styled.div`
  width: 480px;
  height: 10px;
  background-image: url(${logo});
  cursor: pointer;
`;

export {
  Wrapper,
  Container,
  Logo,
};
