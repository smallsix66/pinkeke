import { getNewCartGoods } from '@/api/cart'
export default {
  namespaced: true,
  state: () => {
    return {
      //{pro_id, pro_name, pro_main_images, pro_price, count: 1//已选择件数, selected: true, isEffective: true, pro_stock}
      list: []
    }
  },
  getters: {
    //有效商品列表
    validList(state) {
      return state.list.filter(item => item.pro_stock > 0 && item.isEffective)
    },
    //有效商品件数
    validTotal(state, getters) {
      //reduce为累加器
      return getters.validList.reduce((total, currVal) => total + currVal.count, 0)
    },
    //有效商品总金额
    validAmount(state, getters) {
      return getters.validList.reduce((total, currVal) => total + currVal.pro_price * 100 * currVal.count, 0) / 100
    },
    //无效商品列表
    invalidList(state) {
      return state.list.filter(item => !(item.pro_stock > 0 && item.isEffective))
    },
    //选中商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    //选中商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((total, currVal) => total + currVal.count, 0)
    },
    //选中商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((total, currVal) => total + (currVal.pro_price * 100 * currVal.count), 0) / 100
    },
    //是否全选
    isCheckAll(state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  },
  mutations: {
    //加入购物车
    addCart(state, good) {
      const index = state.list.findIndex(val => val.pro_id === good.pro_id)
      // 逻辑：有相同的给good累加数量，删除相同skuId的商品
      if (index > -1) {
        // console.log("vuex-cart-有相同的给good累加数量-index",index);
        const count = state.list[index].count;
        good.count += count;
        state.list.splice(index, 1)
      }
      state.list.unshift(good);
    },
    //修改购物车商品信息
    updateCart(state, good) {
      // good中字段有可能不完整，good有的信息才去修改。
      // 1. good中必需有pro_id，才能找到对应的商品信息
      const updateGood = state.list.find(item => item.pro_id === good.pro_id)
      for (const key in good) {
        if (good[key] !== null && good[key] !== undefined && good[key] !== '') {
          updateGood[key] = good[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart(state, pro_id) {
      const index = state.list.findIndex(item => item.pro_id === pro_id)
      state.list.splice(index, 1)
    }
  },
  actions: {
    //加入购物车
    insertCart(ctx, good) {
      return new Promise((resolve, reject) => {
        // console.log("vuex-cart-actions调用");
        // if (ctx.rootState.user.user.u_id) {
        //   //已登录
        // } else {
        //未登录
        ctx.commit('addCart', good)
        resolve("加入购物车成功")
        // }
      })
    },
    //获取并更新购物车内最新的商品信息，库存、价格等
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        // if (ctx.rootState.user.user.u_id) {
        //   //已登录
        // } else {
        // 本地
        // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
        // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
        // 传参是promise数组
        const promiseArr = ctx.state.list.map(item => {
          //返回接口函数的调用
          return getNewCartGoods(item.pro_id)
        })
        Promise.all(promiseArr).then(dataArr => {
          dataArr.forEach((data, i) => {
            // console.log("vuex-cart-dataArr-data.list[0]", data.list[0]);
            ctx.commit('updateCart', { ...data.list[0] })//还需要检查data.list[0]
          })
          resolve()
        }).catch(e => {
          reject(e)
        })
        // }
      })
    },
    // 修改购物车商品
    updateCart(ctx, good) {
      // good 中：必须有pro_id，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        // if (ctx.rootState.user.user.u_id) {
        //   // 登录 TODO
        // } else {
        // 本地
        ctx.commit('updateCart', good)
        resolve()
        // }
      })
    },
    // 做有效商品的全选&反选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        // if (ctx.rootState.user.user.u_id) {
        //   // 登录 TODO
        // } else {
        // 本地
        ctx.getters.validList.forEach(item=>{
          item.selected = selected
          ctx.commit('updateCart', item)
        })
        resolve()
        // }
      })
    },
    // 删除购物车商品
    deleteCart(ctx, pro_id) {
      return new Promise((resolve, reject) => {
        // if (ctx.rootState.user.user.u_id) {
        //   // 登录 TODO
        // } else {
        // 本地
        ctx.commit('deleteCart', pro_id)
        resolve()
        // }
      })
    },
    // 批量删除选中商品
    batchDeleteCart(ctx,isClear){
      return new Promise((resolve,reject)=>{
        // if (ctx.rootState.user.user.u_id) {
        //   // 登录 TODO
        // } else {
        // 本地
        // 1. 获取选中商品列表，进行遍历调用deleteCart mutataions函数
        ctx.getters[isClear?'invalidList':'selectedList'].forEach(item=>{
          ctx.commit('deleteCart', item.pro_id)
        })
        resolve()
        // }
      })
    }
  },
}
