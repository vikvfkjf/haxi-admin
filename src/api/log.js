import request from '@/utils/request'

// 日志列表
export function logList(params) {
  return request({
    url: '/v1/admin/op-log/list',
    method: 'get',
    params
  })
}

/**
 * 虚拟中奖名单
 * @param {*} params 
 * @returns 
 */
export function virtualList(params) {
  return request({
    url: '/v1/admin/virtual-draw-history/list',
    method: 'get',
    params
  })
}

/**
 * 生成中奖名单
 * @param {*} data 
 * @returns 
 */
export function postVirtualNum(data) {
  return request({
    url: '/v1/admin/virtual-draw-history/gen',
    method: 'post',
    data
  })
}

/**
 * 删除生成记录
 * @param {*} data 
 * @returns 
 */
export function deleteVirtual(data) {
  return request({
    url: '/v1/admin/virtual-draw-history/delete/'+data.id,
    method: 'delete',
    data
  })
}


