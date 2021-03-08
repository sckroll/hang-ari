<template>
  <section>
    <h1 v-if="topic">{{ topic }}</h1>
    <div class="club-list-container">
      <div ref="left" class="scroll-button left" @click="moveRight">
        <fa-icon icon="chevron-left" />
      </div>
      <div ref="right" class="scroll-button right" @click="moveLeft">
        <fa-icon icon="chevron-right" />
      </div>
      <div ref="clubList" class="club-list">
        <div v-for="club in clubs" :key="club.name">
          <club-preview :club="club" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { previewWidth } from '@/assets/scss/variables.scss'
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
  data() {
    return {
      clubListStyles: null,
      clubListX: 0,
      previewWidthSize: parseInt(previewWidth.replace('px', '')),
    }
  },
  mounted() {
    this.clubListStyles = this.$refs.clubList.style
    this.clubListStyles.right = '0px'

    let buttonMargin = (window.innerWidth - 1200) / 2 + 32
    this.$refs.left.style.left = `${buttonMargin}px`
    this.$refs.right.style.right = `${buttonMargin}px`

    // 브라우저 해상도에 따라 스크롤 버튼 위치 조정
    window.addEventListener('resize', () => {
      buttonMargin = (window.innerWidth - 1200) / 2 + 32
      this.$refs.left.style.left = `${buttonMargin}px`
      this.$refs.right.style.right = `${buttonMargin}px`
    })
  },
  methods: {
    moveLeft() {
      const maxX = this.previewWidthSize * (this.clubs.length - 4) + 16
      if (this.clubListX === maxX) return

      if (
        this.clubListX > maxX - this.previewWidthSize &&
        this.clubListX < maxX
      ) {
        this.clubListX = maxX
      } else {
        this.clubListX += this.previewWidthSize + 16
      }
      this.clubListStyles.right = `${this.clubListX}px`
    },
    moveRight() {
      if (this.clubListX === 0) return

      if (this.clubListX < this.previewWidthSize) {
        this.clubListX = 0
      } else {
        this.clubListX -= this.previewWidthSize + 16
      }
      this.clubListStyles.right = `${this.clubListX}px`
    },
  },
}
</script>

<style lang="scss" scoped>
*,
*::after,
*::before {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: no-drag;
}

h1 {
  border-left: 4px solid $primary-color-0;
  padding-left: 16px;
  line-height: 1;
}

.club-list-container {
  display: flex;
  align-items: center;
}

.club-list {
  position: relative;
  display: flex;
  padding: 16px 0;
  transition: all 0.3s ease;

  & > div {
    margin: 0 8px;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

.scroll-button {
  position: absolute;
  z-index: 1;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba($grey-color-2, 0.5);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba($grey-color-2, 0.7);
  }
}
</style>
