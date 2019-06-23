
import key from 'keymaster';
const delay = (ms) => new Promise((resolve, reject) => {
  setTimeout(()=> resolve('ok'), ms);
});
export default {
  // namespace 是 model state 在全局 state 所用的 key
  namespace: 'count',
  // state 是默认状态
  state: {
    // record 表示 highest record
    record: 0,
    // current 表示当前速度
    current: 0
  },
  // reducer 是唯一可以更新 state 的地方，这个唯一性让我们的 App 更具可预测性，所有的数据修改都有据可查。reducer 是 pure function，他接收参数 state 和 action，返回新的 state，通过语句表达即 (state, action) => newState
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      console.log(newCurrent);
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent
      }
    }
  },
  //   异步处理
  //   dva 通过对 model 增加 effects 属性来处理 side effect(异步任务)
  //   这是基于 redux - saga 实现的， 语法为 generator
  //   当用户点 + 按钮， 数值加 1 之后， 会额外触发一个 side effect， 即延迟 1 秒之后数值减1。
  effects: {
    * add(action, {
      call,
      put
    }) {
      // call 和 put 都是 redux-saga 的 effects，call 表示调用异步函数，put 表示 派发(dispatch) action
      yield call(delay, 1000);
      yield put({
        type: 'minus'
      });
    }
  },
  //   订阅键盘事件
  //   ubscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
  subscriptions: {
    keyboard({
      dispatch
    }) {
      key('space', () => dispatch({
        type: 'add'
      }));
    }
  }
};

