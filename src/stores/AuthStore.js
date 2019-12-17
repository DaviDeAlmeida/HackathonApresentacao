import {
  action,
  observable,
  computed,
  reaction,
} from 'mobx';

import { UserManager } from 'oidc-client';
import axios from 'axios';

import { IdentitySettings } from '../settings';

class AuthStore {
  userManager;

  @observable user;

  constructor() {
    this.userManager = new UserManager(IdentitySettings);

    // Events
    this.userManager.events.addUserLoaded((user) => {
      this.user = user;
    });

    // Reactions
    reaction(
      () => this.user,
      (user) => {
        if (user) {
          axios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
          localStorage.setItem('access_token', user.access_token);
        }
      },
    );
  }

  @action loadUser = () => this.userManager.getUser().then((user) => {
    this.user = user;
    return this.user;
  });

  @computed get isAuthenticated() {
    return this.user && !this.user.expired;
  }

  @action signInRedirect = () => {
    this.userManager.signinRedirect({
      state: {
        returnUrl: window.location.pathname + window.location.search,
      },
    });
  };

  @action signInRedirectCallback = () => this.userManager.signinRedirectCallback();

  @action signInSilent = () => this.userManager.signinSilent();

  @action signInSilentCallback = () => this.userManager.signinSilentCallback();

  @action signOutRedirect = () => this.userManager.signoutRedirect();
}

export default AuthStore;
