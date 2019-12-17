import React from 'react';
import PropTypes from 'prop-types';

import AppLoader from '../../appLoader/AppLoader';

const SignInSilentCallback = ({ signInSilentCallback }) => {
  signInSilentCallback();
  return <AppLoader />;
};

SignInSilentCallback.propTypes = {
  signInSilentCallback: PropTypes.func.isRequired,
};

export default SignInSilentCallback;
