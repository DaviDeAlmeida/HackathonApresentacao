import styled from 'styled-components';
import { Image, Button, Dropdown } from 'semantic-ui-react';

import colors from '../../../../colors';

import Arrow from './images/ico-dropdown.svg';

const Container = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  color: ${colors.offwhite};
  margin-right: 24px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  min-width: 300px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding-top: 4px;
`;

const Avatar = styled(Image)`
  display: flex;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  min-height: 40px;
  border-radius: 25px;
`;

const UserDropdown = styled(Dropdown)`
  &&& {
    > i {
      margin: 2px 6px !important;

      &:before {
        content: url(${Arrow}) !important;
      }
    }

    > .menu {
      margin-top: 2px;

      &:after {
        top: -5px;
        right: 9px !important;
        left: unset !important;
      }
    }
  }
`;

const MenuDropdownContentWrapper = styled.div`
  position: ${({ open }) => (open ? 'fixed' : 'none')};
  top 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const MenuDropdownContent = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')}
  position: absolute;
  color: ${colors.grayA};
  background-color: ${colors.white};
  min-width: 180px;
  z-index: 1;
  right: -12px;
  margin-top: 4px;
  border-radius: 2px;
  padding: 6px 0;

  &:after {
    top: -5px;
    right: 23px;
    content: '';
    position: absolute;
    border-bottom: solid 5px ${colors.white};
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
  }
`;

const MenuButton = styled(Button)`
  &&& {
    width: 100%;
    color: ${colors.grayA};
    background-color: ${colors.white};
    text-align: left;
  }
`;

const UserName = styled.div`
  text-align: right;
  font-size: 14px;
`;

const UserCompany = styled.div`
  font-size: 13px;
  color: ${colors.blueC}
  text-align: right;
  max-width: 256px;
`;

export {
  Container,
  UserContainer,
  InfoContainer,
  UserDropdown,
  MenuDropdownContentWrapper,
  MenuDropdownContent,
  MenuButton,
  Arrow,
  Avatar,
  UserName,
  UserCompany,
};
