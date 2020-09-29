import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Profissionais from '../pages/Profissionais';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/profissionais" component={Profissionais} />

      <Route path="/user/:id" component={Profile} />
    </Switch>
  );
}

export default Routes;