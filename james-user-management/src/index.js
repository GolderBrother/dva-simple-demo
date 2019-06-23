import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';
import user from './pages/users/models/users';

// import antd global style
import 'antd/dist/antd.css'

// 1. Initialize
const app = dva();

// 2. Plugins
// dva 有一个管理 effects 执行的 hook，并基于此封装了 dva-loading 插件。通过这个插件，我们可以不必一遍遍地写 showLoading 和 hideLoading，当发起请求时，插件会自动设置数据里的 loading 状态为 true 或 false 。然后我们在渲染 components 时绑定并根据这个数据进行渲染。
app.use(createLoading());

// 3. Model
app.model(user);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
