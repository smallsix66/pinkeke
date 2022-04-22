import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import category from './modules/category'
import goods from './modules/goods'
import user from './modules/user'
import cart from './modules/cart'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    category,
    goods,
    user,
    cart
  },
  plugins: [vuexLocal.plugin]
})
