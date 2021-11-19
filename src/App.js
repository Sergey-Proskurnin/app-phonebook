import React, { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import AppBar from 'components/AppBar';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCurrentUser,
  getFetchigCurrentUser,
  getCurrentToken,
} from 'redux/auth';
import routes from './routes';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import OnLoader from 'components/OnLoader';

const HomeView = lazy(() =>
  import('views/HomeView' /*webpackChunkName: "home-view" */),
);
const RegisterView = lazy(() =>
  import('views/RegisterView' /*webpackChunkName: "register-view" */),
);
const LoginView = lazy(() =>
  import('views/LoginView' /*webpackChunkName: "login-view" */),
);
const ContactsView = lazy(() =>
  import('views/ContactsView' /*webpackChunkName: "contacts-view" */),
);

const App = () => {
  const isFetchigCurrentUser = useSelector(state =>
    getFetchigCurrentUser(state),
  );

  const isToken = useSelector(state => getCurrentToken(state));

  const dispatch = useDispatch();

  useEffect(() => {
    isToken && dispatch(getCurrentUser());
  }, [dispatch, isToken]);

  return (
    <div>
      <AppBar />

      {isFetchigCurrentUser ? (
        <OnLoader />
      ) : (
        <Suspense fallback={<OnLoader />}>
          <Switch>
            <PublicRoute exact path={routes.home}>
              <HomeView />
            </PublicRoute>
            <PublicRoute
              path={routes.register}
              restricted
              redirectTo={routes.contacts}
            >
              <RegisterView />
            </PublicRoute>
            <PublicRoute
              path={routes.login}
              restricted
              redirectTo={routes.contacts}
            >
              <LoginView />
            </PublicRoute>
            <PrivateRoute path={routes.contacts} redirectTo={routes.login}>
              <ContactsView />
            </PrivateRoute>
          </Switch>
        </Suspense>
      )}
    </div>
  );
};

export default App;
