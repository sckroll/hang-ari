import Vue from 'vue'
import Vuex from 'vuex'
import { clubs } from '@/temp.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    clubs,
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getClubs(state) {
      return state.clubs
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
