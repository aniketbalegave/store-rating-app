import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from './context/authcontext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StoreDetail from './pages/StoreDetail';

const Routes = () => {
  const { user } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/dashboard"
        render={(props) => (user ? <Dashboard {...props} /> : <Login />)}
      />
      <Route path="/store/:id" component={StoreDetail} />
    </Switch>
  );
};

export default Routes;
