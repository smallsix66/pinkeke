import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} proId - 商品proId
 * @returns Promise
 */
export const getNewCartGoods = (pro_id) => {
  return request(`/product`, 'get', { pro_id })
}
