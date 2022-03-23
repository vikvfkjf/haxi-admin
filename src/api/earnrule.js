import request from '@/utils/request'

/**
 * 收益规则列表
 * @param {*} params 
 * @returns 
 */
export function getEarnruleList(params) {
  return request({
    url: '/v1/admin/earn-rule-manage/list',
    method: 'get',
    params
  })
}

/**
 * 收益规则添加
 * @param {*} data 
 * @returns 
 */
export function addEarnrule(data) {
  return request({
    url: '/v1/admin/earn-rule-manage/add',
    method: 'post',
    data
  })
}

/**
 * 收益规则信息更新
 * @param {*} data 
 * @returns 
 */
export function updateEarnrule(data) {
  return request({
    url: '/v1/admin/earn-rule-manage/update',
    method: 'post',
    data
  })
}


/**
 * 收益规则删除
 * @param {*} data 
 * @returns 
 */
export function deleteEarnrule(data) {
  return request({
    url: '/v1/admin/earn-rule-manage/delete/' + data.id,
    method: 'delete',
    data
  })
}

/**
 * 划转列表
 * @param {*} params 
 * @returns 
 */
export function getTransferList(params) {
  return request({
    url: '/v1/admin/transfer-manage/list',
    method: 'get',
    params
  })
}

/**
 * 获取划转统计
 * @param {*} params 
 * @returns 
 */
export function getTransferTotal(params) {
  return request({
    url: '/v1/admin/statics-manage/transfer-info',
    method: 'get',
    params
  })
}
