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
