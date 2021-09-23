import request from '@/utils/request'

// 通道列表
export function channelList(params) {
  return request({
    url: '/v1/admin/channel/list',
    method: 'get',
    params
  })
}

/**
 * 通道配置
 * @param {*} data 
 * @returns 
 */
export function passConfig(data) {
  return request({
    url: '/v1/admin/company/set-channel',
    method: 'post',
    data
  })
}
