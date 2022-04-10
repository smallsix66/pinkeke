import { findGoods } from "@/api/product";

export default {
  namespaced: true,
  state: () => {
    return {
      good:()=>{}
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setGood(state, good) {
      state.good = good
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList({ commit },cate_id) {
      let good = null;
      if(cate_id!==-1){
        let { list }  = await findGoods(cate_id)
        good = list[0];
      }
      // console.log("good", good);
      // 获取数据成功，提交mutations进行数据修改
      commit('setGood', good)
    }
  }
}


