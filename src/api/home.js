import request from "@/utils/request"

/**
 * 获取所有商品信息
*/
export const getAllProduct = () => {
  return request('/product/allproducts', 'get')
}
