import request from "@/utils/request";

//获取所有类目
export const findAllCategory = () => {
  return request('/category', 'get')
}
