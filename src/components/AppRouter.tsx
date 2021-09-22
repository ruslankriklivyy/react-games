import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect, Route, Switch } from 'react-router';
import { auth } from '../config/firebase';
import { privateRoutes, publicRoutes } from '../routes';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';

export const AppRouter = () => {
  const [user] = useAuthState(auth);

  return user ? (
    <Switch>
      {privateRoutes.map(({ path, Component }: any) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={HOME_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }: any) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};
