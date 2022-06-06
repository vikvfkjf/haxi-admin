import request from '@/utils/request'
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
 * 修改用户信息
 * @param {*} data 
 * @returns 
 */
export function changeUserInfo(data) {
  return request({
    url: '/v1/admin/user/update',
    method: 'post',
    data
  })
}

/**
 * 开启谷歌验证
 * @param {*} data 
 * @returns 
 */
 export function google(data) {
  return request({
    url: '/v1/admin/user/open-google-auth',
    method: 'post',
    data
  })
}

