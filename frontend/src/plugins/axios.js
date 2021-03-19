'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL =
  process.env.baseURL || process.env.apiUrl || 'http://localhost:3000/'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    switch (error.response.data.name) {
      case 'TokenExpiredError':
      case 'JsonWebTokenError':
      case 'NotBeforeError':
      case 'AuthError':
        // JWT 에러라면 스토어에서 사용자 정보 삭제
        store.commit('deleteUser')
        break
      default:
        break
    }
    return Promise.reject(error)
  },
)

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
    },
    $axios: {
      get() {
        return _axios
      },
    },
  })
}

Vue.use(Plugin)

export default Plugin
