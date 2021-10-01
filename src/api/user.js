import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }



// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

// 获取图形验证码
export function getVerifyCode() {
  return request({
    url:'/v1/front/get-verify-code/math',
    method:'get'
  })
}

// 注册
export function register(data) {
  return request({
    url:'/v1/front/auth/register',
    method:'post',
    data
  })
}

// 登录
export function login(data) {
  return request({
    url:'/v1/admin/auth/login',
    method:'post',
    data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/v1/admin/user/info',
    method: 'get',
  })
}

/**
 * um8. 修改密码
 * @param {*} data 
 * @returns 
 */
export function changePassword(data) {
  return request({
    url: '/v1/front/user/change-password',
    method: 'post',
    data
  })
}

/**
 * 修改用户信息
 * @param {*} data 
 * @returns 
 */
export function changeUserInfo(data) {
  return request({
    url: '/v1/admin/user/change-info',
    method: 'post',
    data
  })
}

/**
 * 用户列表
 * @param {*} params 
 * @returns 
 */
export function userList(params) {
  return request({
    url: '/v1/admin/user-manage/list',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 * @param {*} data 
 * @returns 
 */
export function addUser(data) {
  return request({
    url: '/v1/admin/user-manage/add-user',
    method: 'post',
    data
  })
}

/**
 * 修改用户信息
 * @param {*} data 
 * @returns 
 */
export function changeUser(data) {
  return request({
    url: '/v1/admin/user-manage/update-user-info',
    method: 'post',
    data
  })
}

