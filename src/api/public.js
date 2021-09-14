import request from '@/utils/request'

// 前置基础信息
export function before() {
  return request({
    url: '/v1/open/before',
    method: 'get'
  })
}
