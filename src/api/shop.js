import request from '@/utils/request'

// 获取商品列表
export function getShopList(params) {
  return request({
    url: '/v1/admin/product-manage/list',
    method: 'get',
    params
  })
}

/**
 * 添加商品
 * @param {*} params 
 * @returns 
 */
export function addShop(data) {
  return request({
    url: '/v1/admin/product-manage/add',
    method: 'post',
    data
  })
}

/**
 * 修改商品
 * @param {*} data 
 * @returns 
 */
export function editShop(data) {
  return request({
    url: '/v1/admin/product-manage/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param {*} data 
 * @returns 
 */
export function deleteShop(data) {
  return request({
    url: '/v1/admin/product-manage/delete/' + data.product_no,
    method: 'delete',
    data
  })
}
