<template>
  <div>
    <club-list-scroll v-if="user" :clubs="[]" :topic="'최근 방문한 동아리'" />
    <club-list-scroll :clubs="shuffle()" :topic="'지금 뜨고 있는 동아리'" />
    <club-list-scroll :clubs="shuffle()" :topic="'가장 활동이 활발한 동아리'" />
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
      clubs: [
        {
          name: '테스트 1',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/100/250',
          to: '/',
        },
        {
          name: '테스트 2',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/200/250',
          to: '/',
        },
        {
          name: '테스트 3',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/300/250',
          to: '/',
        },
        {
          name: '테스트 4',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/400/250',
          to: '/',
        },
        {
          name: '테스트 5',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/500/250',
          to: '/',
        },
        {
          name: '테스트 6',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/600/250',
          to: '/',
        },
        {
          name: '테스트 7',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/700/250',
          to: '/',
        },
        {
          name: '테스트 8',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/800/250',
          to: '/',
        },
        {
          name: '테스트 9',
          description: '뭔가 있어 보이는 동아리입니다.',
          thumbnail: 'http://picsum.photos/id/900/250',
          to: '/',
        },
      ],
    }
  },
  mounted() {
    this.$store.getters.getUser
  },
  methods: {
    // 테스트 동아리 리스트를 섞는 함수
    // 피셔-예이츠(Fisher-Yates) 셔플 알고리즘을 기반으로 작성
    shuffle() {
      const clubs = [...this.clubs]
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
