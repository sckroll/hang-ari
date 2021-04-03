<template>
  <div class="create-club-container">
    <div class="create-club-background"></div>
    <section class="create-club-intro">
      <div class="intro-message">
        <h1>
          동아리 생성
        </h1>
        <h2>새로운 동아리를 만들기 위해 아래의 양식을 작성해주세요.</h2>
      </div>
    </section>
    <section class="form-section">
      <new-club-form />
    </section>
  </div>
</template>

<script>
import NewClubForm from '@/components/NewClubForm.vue'

export default {
  components: {
    NewClubForm,
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 28px;
}

h2 {
  font-size: 20px;
  font-weight: 400;
}

.create-club-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-club-background {
  position: absolute;
  bottom: 20%;
  z-index: -1;
  width: 100%;
  height: 90%;
  background-color: $secondary-color-0;
  transform: skewY(5deg);
}

.create-club-intro {
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
    color: #ffffff;
  }
}

.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
}
</style>
