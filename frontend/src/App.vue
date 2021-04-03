<template>
  <div id="app">
    <header-menu :user="$store.getters.getUser" />
    <main>
      <router-view :user="$store.getters.getUser" />
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
  async mounted() {
    const errorName = await this.$store.dispatch('initUser', this.$axios)

    // 에러 메시지 출력 후 로그인 화면으로 이동
    if (errorName) {
      if (errorName === 'TokenExpiredError') {
        alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.')
      } else if (errorName === 'JsonWebTokenError') {
        alert('로그인 시간이 만료되었습니다. 다시 로그인해주세요.')
      } else {
        alert('계정 오류가 발생하였습니다. 다시 로그인해주세요.')
      }
      this.$router.push('/login')
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
</style>
