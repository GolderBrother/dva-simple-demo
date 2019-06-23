import dva from 'dva';
import { Router, Route, Switch } from 'dva/router';

import count from './model/count';
import home from './model/home';
import Counter from './pages/Counter';
// 1. Initialize
const app = dva();



// 2. 定义模型 Model
//最终状态合并后的状态  {count:{current:0}}
app.model(count);
app.model(home);

// 3. Router
//dva并没有发明任何一个新概念，全是老东西
const HomePage = () => <div>Hello Dva.</div>;
app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/counter" exact component={Counter} />
    </Switch>
  </Router>
);

// 4. Start
app.start('#root');
