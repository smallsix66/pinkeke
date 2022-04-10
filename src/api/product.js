import request from "@/utils/request";

/**
 * 查找商品详情
*/
export const findGoods = (pro_id) => {
  return request('/product', 'get', { pro_id })
}


/**
 * 查找商品评价信息
*/
export const findProdComment = (pro_id) => {
  return request('/product/comment', 'get', { pro_id })
}
