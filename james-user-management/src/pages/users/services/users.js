import request from "../../../utils/request";
import { PAGE_SIZE } from "../constants";
// 获取
export function fetch({page}) {
  // return request(`/api/users?page=${page}&limit=${PAGE_SIZE}`);
  return request(`/api/users?page=${page}`);
}

// 新增
export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

// 更新
export function update(values) {
  return request(`/api/users`, {
    method: 'PATCH',
    body: JSON.stringify(values)
  })
}

// 删除
export function del(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  });
}
