import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} proId - 商品proId
 * @returns Promise
 */
export const getNewCartGoods = (pro_id) => {
  return request(`/product`, 'get', { pro_id })
}

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.pro_id - 商品pro_id
 * @param {Integer} item.pro_price - 商品价格
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */
export const mergeCartGood = (u_id, cartList) => {
  //cartList 是 { pro_id, pro_price, selected, count }对象数组
  return request('/cart/merge', 'post', { u_id, cartList })
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const getCartListGood = (u_id) => {
  return request('/cart/all', 'get', { u_id })
}

/**
 * 添加购物车
 * @returns Promise
 */
export const addCartGood = (u_id, pro_id, pro_price, count, selected) => {
  return request('/cart/add', 'post', { u_id, pro_id, pro_price, count, selected })
}

/**
 * 删除购物车
 * @returns Promise
 */
export const delCartGood = (u_id, pro_ids) => {
  return request('/cart/del', 'delete', { u_id, pro_ids })
}

/**
 * 修改购物车商品的状态和数量
 * @param {String} good.pro_id - 商品pro_id
 * @param {Boolean} good.selected - 选中状态
 * @param {Integer} good.count - 商品数量
 * @returns Promise
 */
export const updateCartGood = (u_id, { pro_id,pro_price, selected, count }) => {
  return request('/cart/update', 'put', { u_id, pro_id,pro_price, selected, count })
}

/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} pro_ids - 有效商品pro_id集合
 * @returns Promise
 */
export const checkAllCartGood = (u_id, { selected, pro_ids }) => {
  return request('/cart/selected', 'put', { u_id, selected, pro_ids })
}
