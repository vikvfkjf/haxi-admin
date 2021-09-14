import request from '@/utils/request'

/**
 * 获取用户充值列表
 * @returns 
 */
export function getRechargeList(params) {
  return request({
    url: '/v1/admin/recharge/list',
    method: 'get',
    params
  })
}

/**
 * 用户充值
 * @param {*} data 
 * @returns 
 */
export function postRecharge(data) {
  return request({
    url: '/v1/admin/recharge',
    method: 'post',
    data
  })
}

/**
 * 消费列表
 * @param {*} params 
 * @returns 
 */
export function getConsumeList(params) {
  return request({
    url: '/v1/admin/consume/list',
    method: 'get',
    params
  })
}
