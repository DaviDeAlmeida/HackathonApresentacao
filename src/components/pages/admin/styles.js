import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '../../../colors';

const Menu = styled.nav`
  display: flex;
  flex: 1 1 290px;
  flex-direction: column;
  margin-top: 24px;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: ${colors.grayA};
  padding: 10px;

  ${({ selected }) => selected && `
    pointer-events: none;
    background-color: ${colors.grayC};
  `}

  &:hover {
    color: ${colors.grayA};
    background-color: ${colors.grayC};
  }
`;

const Divider = styled.div`
  display: flex;
  flex: 0 0 1px;
  width: 1px;
  height: 100%;
  background-color: ${colors.grayC};
  margin: 12px;
`;

const Content = styled.div`
  display: flex
  flex: 1 1 100%;
  margin-top: 12px;
`;

export {
  Menu,
  MenuItem,
  Divider,
  Content,
};
