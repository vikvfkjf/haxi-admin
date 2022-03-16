import request from '@/utils/request'

/**
 * 配置列表
 * @param {*} params 
 * @returns 
 */
export function getConfigureList(params) {
  return request({
    url: '/v1/admin/setting-manage/list',
    method: 'get',
    params
  })
}


/**
 * 配置信息更新
 * @param {*} data 
 * @returns 
 */
export function updateConfigure(data) {
  return request({
    url: '/v1/admin/setting-manage/update',
    method: 'post',
    data
  })
}
