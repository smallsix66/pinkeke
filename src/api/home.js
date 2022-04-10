import request from "@/utils/request"

/**
 * 获取所有商品信息
*/
export const getAllProduct = () => {
  return request('/product/allproducts', 'get')
}


/**
 * 获取所有商品信息
*/
export const getProductByCateId = (cate_id,curr_page,page_size) => {
  return request('/category/products', 'get',{cate_id,curr_page,page_size})
}
