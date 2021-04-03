import Vue from 'vue'
import Vuex from 'vuex'
import { clubs } from '@/temp.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    clubs,
    headerReversed: false,
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getClubs(state) {
      return state.clubs
    },
    getHeaderReversed(state) {
      return state.headerReversed
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    deleteUser(state) {
      state.user = null
    },
    setHeaderReversed(state, payload) {
      state.headerReversed = payload
    },
  },
  actions: {
    async initUser(context, axios) {
      try {
        const { data } = await axios.get('/api/auth/check')
        if (data) {
          context.commit('setUser', data)
        }
      } catch (e) {
        const errorName = e.response.data.name
        return errorName
      }
    },
  },
  modules: {},
})
