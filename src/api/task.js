import request from '@/utils/request'

// 发送任务列表
export function taskList(params) {
  return request({
    url: '/v1/admin/review/send-task-list',
    method: 'get',
    params
  })
}

/**
 * 短信发送审核
 * @param {*} data 
 * @returns 
 */
export function sendTask(data) {
  return request({
    url: '/v1/admin/review/send-task',
    method: 'post',
    data
  })
}

/**
 * 子任务列表
 * @param {*} params 
 * @returns 
 */
export function subTaskList(params) {
  return request({
    url: '/v1/admin/send-task/sub-task-list',
    method: 'get',
    params
  })
}

/**
 * 子任务发送
 * @param {*} data 
 * @returns 
 */
 export function sendSubTask(data) {
  return request({
    url: '/v1/admin/send-task/exec-sub-task',
    method: 'post',
    data
  })
}

/**
 * 修改任务信息
 * @param {*} data 
 * @returns 
 */
export function changeTask(data) {
  return request({
    url: '/v1/admin/send-task/update',
    method: 'post',
    data
  })
}

/**
 * 修改子任务信息
 * @param {*} data 
 * @returns 
 */
export function changeSubTask(data) {
  return request({
    url: '/v1/admin/send-task/update-sub-task',
    method: 'post',
    data
  })
}

/**
 * 发送记录
 * @param {*} params 
 * @returns 
 */
export function sendRecord(params) {
  return request({
    url: '/v1/admin/send-task/send-record',
    method: 'get',
    params
  })
}
