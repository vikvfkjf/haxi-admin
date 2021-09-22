import request from '@/utils/request'

/**
 * 小号申请列表
 * @returns 
 */
export function getPhoneApplyList(params) {
  return request({
    url: '/v1/admin/review/phone-apply-list',
    method: 'get',
    params
  })
}

/**
 * 小号申请审核
 * @param {*} data 
 * @returns 
 */
export function examineNumber(data) {
  return request({
    url: '/v1/admin/review/review-phone-apply',
    method: 'post',
    data
  })
}

/**
 * 绑定隐私号
 * @param {*} data 
 * @returns 
 */
export function bindNumber(data) {
  return request({
    url: '/v1/admin/company/import-phone',
    method: 'post',
    data
  })
}

/**
 * 小号列表
 * @param {*} params 
 * @returns 
 */
export function getPhoneList(params) {
  return request({
    url: '/v1/admin/company/phone-list',
    method: 'get',
    params
  })
}

/**
 * 管理员小号列表
 * @param {*} params 
 * @returns 
 */
export function getSelfPhoneList(params) {
  return request({
    url: '/v1/admin/company/admin-phone-list',
    method: 'get',
    params
  })
}
