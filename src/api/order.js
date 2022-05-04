import request from '@/utils/request'

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrder = (u_id, selectedList,selectedTotal,selectedAmount) => {
  return request('/user/order/submit', 'post', {u_id, selectedList,selectedTotal,selectedAmount})
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (order_id) => {
  return request('/user/order/detail', 'get', { order_id })
}

/**
 * 修改订单状态
 * @param {String} id - 订单ID
 */
export const changeOrderState = (order) => {
  return request('/user/order/changeorderstate', 'post', { order })
}

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待评价、3为已完成、4为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
 export const findOrderList = (u_id, { orderState, page, pageSize }) => {
  return request('/user/order/list', 'get', { u_id, orderState, page, pageSize })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
 export const delteOrder = (ids) => {
  return request('/user/order/delete', 'delete', { ids })
}
