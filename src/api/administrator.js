import request from '@/utils/request'

/**
 * 获取管理员列表
 * @param {*} params 
 * @returns 
 */
export function getAdministrator(params) {
  return request({
    url: '/v1/admin/user/list',
    method: 'get',
    params
  })
}

/**
 *  管理员添加
 * @param {*} data 
 * @returns 
 */
export function addAdministrator(data) {
  return request({
    url: '/v1/admin/user/add',
    method: 'post',
    data
  })
}

/**
 * 修改管理员信息
 * @param {*} data 
 * @returns 
 */
export function editAdministrator(data) {
  return request({
    url: '/v1/admin/user/change-info',
    method: 'post',
    data
  })
}

/**
 * 角色列表
 * @param {*} params 
 * @returns 
 */
export function getRoleList(params) {
  return request({
    url: '/v1/admin/user/role-list',
    method: 'get',
    params
  })
}
