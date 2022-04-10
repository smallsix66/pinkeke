import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state: () => {
    return {
      list: topCategory.map((item, i) => ({ cate_id: i, cate_name: item, cate_status: 1 }))
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setCategory(state, headCategory) {
      state.list = headCategory
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList({ commit }) {
      const { list } = await findAllCategory()
      // console.log("list", list);
      // 获取数据成功，提交mutations进行数据修改
      commit('setCategory', list)
    }
  }
}

