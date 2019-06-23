/*
 * @Description: dva user 模型 
 * @Author: james.zhang 
 * @Date: 2019-06-22 18:51:38 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-06-23 16:07:27
 */

import * as userService from "../services/users";
export default {
    namespace: 'users',
    state: {
        list: [],
        page: 1,
        total: 0,
        isCreate: true,
        editVisible: false,
        record: {},
        loading: false,
        // 多选
        selectedRowKeys: []
    },
    reducers: {
        // fetch(state, {payload:{page}}){
        //     return {
        //         ...state,
        //         page
        //     }
        // },
        save(state, {payload}){
            return {
                ...state,
                ...payload
            }
        }
    },
    effects: {
        *fetch({payload}, {call, put}){
            let page;
            if(payload) {
                page = payload.page || 1;
            }
            const {list, total} = yield call(userService.fetch, {...payload});
            yield put({type: 'save', payload: {list, page: parseInt(page, 10), total}});
        },
        *update({payload}, {call,put,select}){
            yield call(userService.update,payload);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload:{page}});
            // yield put({type: "reload"});
            yield put({type: 'save', payload: {editVisible: false}});
        },
        *create({payload}, {call, put}){
            console.log(payload)
            yield call(userService.create, payload);
            yield put({type: 'fetch', payload: {page:1}});
            // yield put({type: "reload"});
            yield put({type: 'save', payload: {editVisible: false}});
        },
        *del({payload}, {call, put}) {
            yield call(userService.del, payload);
            yield put({
                type: 'fetch',
                payload: {
                    page: 1
                }
            });
            // yield put({type: "reload"});
        },
        *reload(action, {put, select}){
            const page = yield select(state => state.users.page) || 1;
            console.log(page);
            yield put({type: 'fetch', payload: {page}});
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname,query}) => {
                if(pathname === "/users") {
                    dispatch({type: 'fetch', payload: query});
                }
            })
        }
    }
}

