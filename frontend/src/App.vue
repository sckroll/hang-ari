<template>
  <div id="app">
    <header-menu />
    <main>
      <div class="main-container">
        <div class="main-center">
          <router-view />
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
}

main {
  display: flex;
  justify-content: center;
  width: 100%;
}

.main-container {
  width: 1200px;
  margin: 32px 0;
}

.main-center {
  padding: 0 32px;
}
</style>
