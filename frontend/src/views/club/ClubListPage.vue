<template>
  <div>
    <club-list-scroll :clubs="[]" topic="내가 가입한 동아리" :more="more" />
    <club-list-grid :clubs="clubs" topic="동아리 목록 - 가나다순" />
  </div>
</template>

<script>
import ClubListScroll from '@/components/ClubListScroll.vue'
import ClubListGrid from '@/components/ClubListGrid.vue'

export default {
  components: {
    ClubListScroll,
    ClubListGrid,
  },
  data() {
    return {
      clubs: this.$store.getters.getClubs,
      more: {
        name: '동아리 생성',
        to: '/club',
      },
    }
  },
}
</script>

<style></style>
