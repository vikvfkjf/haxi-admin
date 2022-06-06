import request from '@/utils/request'

/**
 * 游戏列表
 * @param {*} params 
 * @returns 
 */
export function getGameList(params) {
  return request({
    url: '/v1/admin/game-manage/list',
    method: 'get',
    params
  })
}

/**
 * 游戏添加
 * @param {*} data 
 * @returns 
 */
 export function addGame(data) {
    return request({
      url: '/v1/admin/game-manage/add',
      method: 'post',
      data
    })
  }
  
  /**
   * 游戏信息更新
   * @param {*} data 
   * @returns 
   */
  export function updateGame(data) {
    return request({
      url: '/v1/admin/game-manage/update',
      method: 'post',
      data
    })
  }

/**
 * 游戏删除
 * @param {*} data 
 * @returns 
 */
 export function deleteGame(data) {
    return request({
      url: '/v1/admin/game-manage/delete/' + data.id,
      method: 'delete',
      data
    })
  }