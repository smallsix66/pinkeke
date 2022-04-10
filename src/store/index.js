import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import category from './modules/category'
import goods from './modules/goods'

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
    goods
  },
  plugins: [vuexLocal.plugin]
})
