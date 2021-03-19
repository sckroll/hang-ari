import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    deleteUser(state) {
      state.user = null
    },
  },
  actions: {},
  modules: {},
})
