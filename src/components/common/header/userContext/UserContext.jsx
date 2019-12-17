import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';

import Notifications from '../../notifications/Notifications';
import AvatarImage from './images/header-avatar.svg';
import { getRoleName } from '../../../../modules/auth';

import {
  Container,
  UserContainer,
  InfoContainer,
  UserName,
  UserCompany,
  Avatar,
  UserDropdown,
} from './styles';

const initialState = {
  isMenuOpen: false,
};

@inject('AppStore')
@observer
class UserContext extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  _toggleMenu = () => this.setState((prev) => ({ isMenuOpen: !prev.isMenuOpen }));

  render() {
    const {
      AppStore: {
        AuthStore: {
          user: {
            profile,
          },
          signOutRedirect,
        },
      },
    } = this.props;

    return (
      <Container>
        <Notifications />
        <UserContainer>
          <InfoContainer>
            <UserName>{profile.name} {profile.family_name}</UserName>
            <UserCompany>{getRoleName(profile.role)}</UserCompany>
          </InfoContainer>
          <UserDropdown pointing direction="left">
            <Dropdown.Menu>
              <Dropdown.Item onClick={signOutRedirect}>
                <Icon name="sign-out" />
                Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </UserDropdown>
          <Avatar src={AvatarImage} alt={profile.name} />
        </UserContainer>
      </Container>
    );
  }
}

UserContext.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    AuthStore: PropTypes.shape({
      user: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string,
          family_name: PropTypes.string,
          role: PropTypes.string,
        }),
      }),
      signOutRedirect: PropTypes.func,
    }),
  }),
};

export default UserContext;
