import request from '@/utils/request'

/**
 * 代理列表
 * @param {*} params 
 * @returns 
 */
export function getAgentList(params) {
  return request({
    url: '/v1/admin/admin-manage/list',
    method: 'get',
    params
  })
}

/**
 * 代理添加
 * @param {*} data 
 * @returns 
 */
export function addAgent(data) {
  return request({
    url: '/v1/admin/admin-manage/add',
    method: 'post',
    data
  })
}

/**
 * 代理信息更新
 * @param {*} data 
 * @returns 
 */
export function updateAgent(data) {
  return request({
    url: '/v1/admin/admin-manage/update',
    method: 'post',
    data
  })
}


/**
 * 代理删除
 * @param {*} data 
 * @returns 
 */
export function deleteAgent(data) {
  return request({
    url: '/v1/admin/admin-manage/delete/' + data.user_no,
    method: 'delete',
    data
  })
}
