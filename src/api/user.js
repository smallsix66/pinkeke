import request from '@/utils/request'

/**
 * 帐号/手机号密码登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = (formData) => {
  const {mobile,password,code} = formData;
  let account = mobile;
  return request('/user/login', 'post', { account, password })
}

