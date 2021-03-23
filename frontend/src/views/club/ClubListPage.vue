<template>
  <div>
    <club-list-grid :clubs="[]" topic="내가 가입한 동아리" />
    <club-list-grid :clubs="clubs" topic="동아리 목록 - 가나다순" />
  </div>
</template>

<script>
import ClubListGrid from '@/components/ClubListGrid.vue'

export default {
  components: {
    ClubListGrid,
  },
  data() {
    return {
      clubs: this.$store.getters.getClubs,
    }
  },
}
</script>

<style></style>
