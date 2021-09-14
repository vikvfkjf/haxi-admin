import request from '@/utils/request'

/**
 * 获取公司列表
 * @returns 
 */
export function getCompanyList() {
  return request({
    url: '/v1/admin/company/list',
    method: 'get'
  })
}

/**
 * 获取用户价格配置信息
 * @param {*} params 
 * @returns 
 */
export function getPriceConfig(params) {
  return request({
    url: '/v1/admin/price-config/info',
    method: 'get',
    params
  })
}

/**
 * 修改用户价格模板(不存在则新增)
 * @param {*} data 
 * @returns 
 */
export function modifyPriceConfig(data) {
  return request({
    url: '/v1/admin/price-config/modify',
    method: 'post',
    data
  })
}

/**
 * 用户公司白名单ip列表
 * @param {*} params 
 * @returns 
 */
export function getWhiteIpList(params) {
  return request({
    url: '/v1/admin/company/white-ip-list',
    method: 'get',
    params
  })
}

/**
 * 添加用户公司白名单ip
 * @param {*} data 
 * @returns 
 */
export function addWhiteIp(data) {
  return request({
    url: '/v1/admin/company/add-white-ip',
    method: 'post',
    data
  })
}

/**
 * 删除用户公司白名单ip
 * @param {*} data 
 * @returns 
 */
export function deleteIp(data) {
  return request({
    url: '/v1/admin/company/white-ip',
    method: 'DELETE',
    data
  })
}

/**
 *  营业执照审核
 * @param {*} data 
 * @returns 
 */
export function companyApply(data) {
  return request({
    url: '/v1/admin/review/review-company-apply',
    method: 'post',
    data
  })
}


