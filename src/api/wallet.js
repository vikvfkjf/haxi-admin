import request from '@/utils/request'

/**
 * 游戏钱包列表
 * @param {*} params 
 * @returns 
 */
export function getWalletList(params) {
  return request({
    url: '/v1/admin/game-wallet-manage/list',
    method: 'get',
    params
  })
}

/**
 * 游戏钱包添加
 * @param {*} data 
 * @returns 
 */
 export function addWallet(data) {
    return request({
      url: '/v1/admin/game-wallet-manage/add',
      method: 'post',
      data
    })
  }
  
  /**
   * 游戏钱包信息更新
   * @param {*} data 
   * @returns 
   */
  export function updateWallet(data) {
    return request({
      url: '/v1/admin/game-wallet-manage/update',
      method: 'post',
      data
    })
  }

/**
 * 游戏钱包删除
 * @param {*} data 
 * @returns 
 */
 export function deleteWallet(data) {
    return request({
      url: '/v1/admin/game-wallet-manage/delete/' + data.id,
      method: 'delete',
      data
    })
  }