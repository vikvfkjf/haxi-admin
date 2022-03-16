import request from '@/utils/request'

/**
 * 项目列表
 * @param {*} params 
 * @returns 
 */
export function getProjectList(params) {
  return request({
    url: '/v1/admin/project-manage/list',
    method: 'get',
    params
  })
}

/**
 * 项目添加
 * @param {*} data 
 * @returns 
 */
export function addProject(data) {
  return request({
    url: '/v1/admin/project-manage/add',
    method: 'post',
    data
  })
}

/**
 * 项目信息更新
 * @param {*} data 
 * @returns 
 */
export function updateProject(data) {
  return request({
    url: '/v1/admin/project-manage/update',
    method: 'post',
    data
  })
}


/**
 * 项目删除
 * @param {*} data 
 * @returns 
 */
export function deleteProject(data) {
  return request({
    url: '/v1/admin/project-manage/delete/' + data.id,
    method: 'delete',
    data
  })
}
