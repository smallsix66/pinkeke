// 用户状态
export default {
  namespaced: true,
  state: () => {
    return {
      user: () => ({
        u_avatar: "", u_email: "", u_id: "", u_idcard: "", u_name: "", u_nickname: "", u_sex: "", u_tel: ""
      })
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    }
  }
}
