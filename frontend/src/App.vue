<template>
  <div id="app">
    <header-menu :user="$store.getters.getUser" />
    <main>
      <div class="main-container">
        <div class="main-center">
          <router-view :user="$store.getters.getUser" />
        </div>
      </div>
    </main>
    <footer-bar />
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  components: {
    HeaderMenu,
    FooterBar,
  },
  async created() {
    try {
      const { data } = await this.$axios.get('/api/auth/check')
      if (data) {
        this.$store.commit('setUser', data)
      }
    } catch (e) {
      const errorName = e.response.data.name
      if (errorName === 'TokenExpiredError') {
        alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.')
      } else if (errorName === 'JsonWebTokenError') {
        alert('로그인 시간이 만료되었습니다. 다시 로그인해주세요.')
      } else {
        alert('계정 오류가 발생하였습니다. 다시 로그인해주세요.')
      }
    }
  },
}
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.main-container {
  width: 1200px;
  margin: 32px 0;
}

.main-center {
  padding: 0 32px;
  height: 100%;
}
</style>
