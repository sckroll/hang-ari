<template>
  <section>
    <h1 v-if="topic">{{ topic }}</h1>
    <div v-if="clubs.length > 0" class="club-list-container">
      <div class="club-list">
        <div v-for="club in clubs" :key="club.name">
          <club-preview :club="club" />
        </div>
      </div>
    </div>
    <div v-else class="club-list-empty">
      <span>동아리가 존재하지 않습니다.</span>
    </div>
  </section>
</template>

<script>
import ClubPreview from '@/components/ClubPreview.vue'

export default {
  components: {
    ClubPreview,
  },
  props: {
    clubs: {
      type: Array,
      required: true,
    },
    topic: {
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
*,
*::after,
*::before {
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: no-drag;
}

section {
  padding-bottom: 32px;
}

h1 {
  border-left: 4px solid $primary-color-0;
  padding-left: 16px;
  line-height: 1;
}

.club-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, $preview-width);
  justify-content: space-between;
  transition: all 0.3s ease;

  > div {
    display: flex;
    justify-content: center;
    margin: 16px 0;
  }
}

.club-list-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: $preview-width;
  padding: 16px 0;

  > span {
    font-size: 20px;
    color: $grey-color-2;
  }
}
</style>
