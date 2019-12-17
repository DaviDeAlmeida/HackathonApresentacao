import styled from 'styled-components';

import colors from '../../../../colors';

const Container = styled.div`
  display: flex;
  flex: 0 0 25px;
  width: 25px;
  justify-content: center;
  transition: margin 0.3s ease-out;
  position: relative;

  ${({ isOpen, right }) => isOpen && `
    margin-left: ${right ? '18px' : '0px'};
    margin-right: ${!right ? '18px' : '0px'};
  `}
`;

const SidebarSwitcherButton = styled.div`
  position: absolute;
  display: flex;
  flex: 0 0 25px;
  width: 25px;
  height: 25px;
  top: 10px;
  background-color: ${colors.offwhite};
  border: 1px solid ${colors.blueD};
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(${(props) => (props.isOpen ? '180' : '0')}deg);

  &:hover {
    background-color: white;
  }
`;

const SidebarSwitcherTrail = styled.div`
  display: flex;
  flex: 0 0 1px;
  width: 1px;
  height: 100%;
  background-color: ${colors.blueD};
`;

export {
  Container,
  SidebarSwitcherButton,
  SidebarSwitcherTrail,
};
