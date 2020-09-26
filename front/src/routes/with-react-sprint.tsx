import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

import signIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route path="/" exact component={signIn} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
}

export default Routes;