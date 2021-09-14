import request from '@/utils/request'

/**
 * um10. 用户应用列表
 * @returns 
 */
export function userApp() {
    return request({
      url:'/v1/front/user/user-app',
      method:'get'
    })
}

/**
 * um7. 创建应用
 * @param {*} data 
 * @returns 
 */
export function storeApp(data) {
    return request({
        url:'/v1/front/user/store-app',
        method:'post',
        data
    })
}
