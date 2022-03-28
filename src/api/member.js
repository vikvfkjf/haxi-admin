import request from '@/utils/request'

/**
 * 会员列表
 * @param {*} params 
 * @returns 
 */
export function getMemberList(params) {
  return request({
    url: '/v1/admin/member-manage/list',
    method: 'get',
    params
  })
}

/**
 * 会员信息更新
 * @param {*} data 
 * @returns 
 */
export function updateMember(data) {
  return request({
    url: '/v1/admin/member-manage/update',
    method: 'post',
    data
  })
}

/**
 * 删除会员
 * @param {*} data 
 * @returns 
 */
export function deleteMember(data) {
  return request({
    url: '/v1/admin/member-manage/delete/'+data.member_no,
    method: 'delete',
    data
  })
}

/**
 * 划转
 * @param {*} data 
 * @returns 
 */
export function transfer(data) {
  return request({
    url: '/v1/admin/transfer-manage/transfer',
    method: 'post',
    data
  })
}


/**
 * 批量刷新余额
 * @param {*} data 
 * @returns 
 */
export function batchRefresh(data) {
  return request({
    url: '/v1/admin/member-manage/balance-batch-refresh',
    method: 'post',
    data
  })
}

/**
 * 余额刷新
 * @param {*} data 
 * @returns 
 */
export function balanceRefresh(data) {
  return request({
    url: '/v1/admin/member-manage/balance-refresh',
    method: 'post',
    data
  })
}

/**
 * 挖矿订单列表
 * @param {*} params 
 * @returns 
 */
export function memberEarnList(params) {
  return request({
    url: '/v1/admin/mine-order-manage/list',
    method: 'get',
    params
  })
}

/**
 * 调整会员归属的后台人员
 * @param {*} data 
 * @returns 
 */
export function changeBelong(data) {
  return request({
    url: '/v1/admin/member-manage/change-belong-admin',
    method: 'post',
    data
  })
}

/**
 * 手动派发
 * @param {*} data 
 * @returns 
 */
export function sdpf(data) {
  return request({
    url: '/v1/admin/mine-order-manage/manual-send',
    method: 'post',
    data
  })
}