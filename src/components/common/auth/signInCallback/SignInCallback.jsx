import React from 'react';
import PropTypes from 'prop-types';

import history from '../../../../history';
import AppLoader from '../../appLoader/AppLoader';

const SignInCallback = ({ signInRedirectCallback }) => {

  const successCallback = ({ state }) => {
    if (state && state.returnUrl) history.push(state.returnUrl);
    else history.push('/');
  };

  signInRedirectCallback()
    .then((user) => successCallback(user));

  return <AppLoader />;
};

SignInCallback.propTypes = {
  signInRedirectCallback: PropTypes.func.isRequired,
};

export default SignInCallback;
