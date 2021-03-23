<template>
  <div>
    <club-list-scroll v-if="user" :clubs="[]" topic="최근 방문한 동아리" />
    <club-list-scroll
      :clubs="shuffle()"
      topic="지금 뜨고 있는 동아리"
      :more="moreButton"
    />
    <club-list-scroll :clubs="shuffle()" topic="가장 활동이 활발한 동아리" />
  </div>
</template>

<script>
import ClubListScroll from '@/components/ClubListScroll.vue'

export default {
  components: {
    ClubListScroll,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      moreButton: {
        name: '더 보기',
        to: '/club',
      },
    }
  },
  methods: {
    // 테스트 동아리 리스트를 섞는 함수
    // 피셔-예이츠(Fisher-Yates) 셔플 알고리즘을 기반으로 작성
    shuffle() {
      const clubs = [...this.$store.getters.getClubs]
      for (let i = clubs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[clubs[i], clubs[j]] = [clubs[j], clubs[i]]
      }
      return clubs
    },
  },
}
</script>

<style lang="scss" scoped></style>
