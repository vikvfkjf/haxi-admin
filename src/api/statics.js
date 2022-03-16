import request from '@/utils/request'

/**
 * 会员信息列表
 * @param {*} params 
 * @returns 
 */
export function getMemberInfoList(params) {
  return request({
    url: '/v1/admin/statics-manage/member-info',
    method: 'get',
    params
  })
}

/**
 * 挖矿列表
 * @param {*} params 
 * @returns 
 */
 export function getMineInfoList(params) {
    return request({
      url: '/v1/admin/statics-manage/mine-info',
      method: 'get',
      params
    })
  }