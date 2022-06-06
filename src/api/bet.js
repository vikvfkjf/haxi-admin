import request from '@/utils/request'

/**
 * 投注列表
 * @param {*} params 
 * @returns 
 */
export function getBetList(params) {
  return request({
    url: '/v1/admin/bet-manage/list',
    method: 'get',
    params
  })
}

/**
 * 投注添加
 * @param {*} data 
 * @returns 
 */
export function addBet(data) {
  return request({
    url: '/v1/admin/bet-manage/add',
    method: 'post',
    data
  })
}

/**
 * 投注信息更新
 * @param {*} data 
 * @returns 
 */
export function updateBet(data) {
  return request({
    url: '/v1/admin/bet-manage/update',
    method: 'post',
    data
  })
}

/**
 * 投注删除
 * @param {*} data 
 * @returns 
 */
export function deleteBet(data) {
  return request({
    url: '/v1/admin/bet-manage/delete/' + data.id,
    method: 'delete',
    data
  })
}

/**
 * 分割报表信息
 * @param {*} params 
 * @returns 
 */
export function getDayReport(params) {
  return request({
    url: '/v1/admin/bet-manage/seg-report',
    method: 'get',
    params
  })
}

/**
 * 总报表信息
 * @param {*} params 
 * @returns 
 */
export function getSumReport(params) {
  return request({
    url: '/v1/admin/bet-manage/sum-report',
    method: 'get',
    params
  })
}

/**
 * 投注退款
 * @param {*} params 
 * @returns 
 */
export function refund(data) {
  return request({
    url: '/v1/admin/bet-manage/refund',
    method: 'post',
    data
  })
}

/**
 * 运行指定区块任务
 * @param {*} data 
 * @returns 
 */
export function runHistoryTask(data) {
  return request({
    url: '/v1/admin/bet-manage/run-history-task',
    method: 'post',
    data
  })
}
