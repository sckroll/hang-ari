<template>
  <div class="login-container">
    <section class="login-center">
      <login-form />
    </section>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    LoginForm,
  },
  props: {
    user: {
      type: Object,
    },
  },
  mounted() {
    if (this.user) {
      this.$router.replace('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
