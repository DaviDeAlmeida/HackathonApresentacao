import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '../../../colors';

const Nav = styled.nav`
  display: flex;
  flex: 0 0 70px;
  height: 70px;
  flex-flow: column nowrap;
  justify-content: flex-end;
  background-color: ${colors.offwhite};
`;
const Ul = styled.ul`
  display: flex;
  margin: 0 0 10px;
  border-bottom: 1px solid ${colors.blueD}
`;

const Li = styled.li`
  position: relative;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.grayA};
  font-size: 13.5px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 20px 12px 20px;
  :hover {
    color: ${colors.black};
  }
`;

const StyledLabel = styled.div`
  text-decoration: none;
  color: ${colors.grayA};
  font-size: 13.5px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 0 20px 12px 20px;
  border-bottom: 5px solid ${colors.blueB};
`;

export {
  Nav,
  Ul,
  Li,
  StyledLink,
  StyledLabel,
};
