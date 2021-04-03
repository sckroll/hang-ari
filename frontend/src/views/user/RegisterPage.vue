<template>
  <div class="register-container">
    <div class="register-background"></div>
    <section class="register-intro">
      <div class="intro-message">
        <h1>
          한기대 동아리를 위한 커뮤니티 서비스, 항아리에 오신 것을 환영합니다!
        </h1>
        <h2>서비스 이용을 위해 아래의 양식을 작성해주세요.</h2>
      </div>
    </section>
    <section class="register-basic">
      <register-form />
    </section>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  components: {
    RegisterForm,
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
h1 {
  font-size: 32px;
}

h2 {
  font-size: 20px;
  font-weight: 400;
}

.register-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-background {
  position: absolute;
  bottom: 20%;
  z-index: -1;
  width: 100%;
  height: 90%;
  background-color: $primary-color-0;
  transform: skewY(5deg);
}

.register-intro {
  width: 100%;
  height: 512px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;

  & > .intro-message {
    position: relative;
    bottom: 64px;
    width: 512px;
  }
}

.register-basic {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
}
</style>
