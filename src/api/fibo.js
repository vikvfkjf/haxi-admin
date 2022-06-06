import request from '@/utils/request'

// 日志列表
export function logList(params) {
  return request({
    url: '/v1/admin/op-log/list',
    method: 'get',
    params
  })
}