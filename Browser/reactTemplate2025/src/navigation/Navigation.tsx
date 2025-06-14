import React, { FC, useEffect, useState, useMemo } from 'react';
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './NavigationConstants';
import Home from '../containers/home/Home';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
  return (
    <Switch>
      <Redirect exact from="/" to={routes.home} />
      <Route exact path={routes.home} component={Home} />
    </Switch>
  );
};

export default Navigation;
