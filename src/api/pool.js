import request from '@/utils/request'

/**
 * 矿池列表
 * @param {*} params 
 * @returns 
 */
export function getPoolList(params) {
  return request({
    url: '/v1/admin/mine-pool-manage/list',
    method: 'get',
    params
  })
}

/**
 * 矿池添加
 * @param {*} data 
 * @returns 
 */
export function addPool(data) {
  return request({
    url: '/v1/admin/mine-pool-manage/add',
    method: 'post',
    data
  })
}

/**
 * 矿池信息更新
 * @param {*} data 
 * @returns 
 */
export function updatePool(data) {
  return request({
    url: '/v1/admin/mine-pool-manage/update',
    method: 'post',
    data
  })
}


/**
 * 矿池删除
 * @param {*} data 
 * @returns 
 */
export function deletePool(data) {
  return request({
    url: '/v1/admin/mine-pool-manage/delete/' + data.id,
    method: 'delete',
    data
  })
}
