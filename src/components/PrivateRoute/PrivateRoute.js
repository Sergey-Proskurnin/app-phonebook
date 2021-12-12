import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import {
  getIsAuthenticated,
  loginGoogleSuccess,
  refreshLoginGoogleSuccess,
} from 'redux/auth';

/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise, render Redirect to / login
 */

const PrivateRoute = ({ redirectTo, children, location, ...routeProps }) => {
  const { refreshToken, token } = queryString.parse(location?.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loginGoogleSuccess(token));
      dispatch(refreshLoginGoogleSuccess(refreshToken));
    }
  }, [dispatch, refreshToken, token]);

  const isAuthenticated = useSelector(state => getIsAuthenticated(state));

  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to={redirectTo} />}
    </Route>
  );
};
export default PrivateRoute;
