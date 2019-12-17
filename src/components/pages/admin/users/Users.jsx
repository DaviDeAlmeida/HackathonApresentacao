/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

const List = lazy(() => import('./list/UsersList'));

const Users = ({ match: { url } }) => (
  <Switch>
    <Route
      exact
      path={url}
      component={(props) => <List {...props} />}
    />
  </Switch>
);

Users.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Users;
