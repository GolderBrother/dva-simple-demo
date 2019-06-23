import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import UsersPage from './pages/users';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/users" exact component={UsersPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
