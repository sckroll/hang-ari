<template>
  <div class="club-container">
    <section class="club-bg">
      <img class="club-bg-image" :src="club.background" :alt="club.name" />
      <div class="club-bg-overlay"></div>
      <div class="club-header">
        <div>
          <div class="club-header-center">
            <div class="club-logo">
              <img :src="club.logo" :alt="club.name" draggable="false" />
            </div>
            <div class="club-title">
              <div class="club-name">{{ club.name }}</div>
              <div class="club-category">{{ club.category }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="club-center">
      <section class="club-info">
        <div class="club-info-main">
          <div class="club-description">{{ club.description }}</div>
          <div class="club-tags">
            <span v-for="tag in club.tags" :key="tag" class="club-tag"
              >#{{ tag }}</span
            >
          </div>
        </div>
        <div class="club-info-sub">
          <div class="club-info-item">
            <div class="club-label">설립일자</div>
            <div class="club-value">
              {{ club.establishedAt | formatDate }}
            </div>
          </div>
          <div class="club-info-item">
            <div class="club-label">생성일자</div>
            <div class="club-value">
              {{ club.createdAt | formatDate }}
            </div>
          </div>
          <div v-if="club.room" class="club-info-item">
            <div class="club-label">위치</div>
            <div class="club-value">{{ club.room }}</div>
          </div>
          <div v-if="club.professor" class="club-info-item">
            <div class="club-label">지도교수</div>
            <div class="club-value">{{ club.professor }}</div>
          </div>
          <div v-if="club.homepage" class="club-info-item">
            <div class="club-label">홈페이지</div>
            <div class="club-value">{{ club.homepage }}</div>
          </div>
        </div>
      </section>
      <section class="club-content">
        asdf
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      club: {},
    }
  },
  filters: {
    formatDate(dateStr) {
      const date = new Date(dateStr)

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return year + '년 ' + month + '월 ' + day + '일'
    },
  },
  async mounted() {
    try {
      // 동아리 정보 조회
      const clubId = this.$router.currentRoute.params.id
      const { data } = await this.$axios.get(`/api/club?clubId=${clubId}`)

      this.club = data[0]
      if (!this.club) throw new Error()

      // 동아리 로고 마우스 오른쪽 버튼 클릭 방지
      const $logo = this.$el.querySelector('.club-logo > img')
      $logo.addEventListener('contextmenu', e => {
        e.preventDefault()
      })
    } catch (e) {
      console.error(e)

      alert('존재하지 않는 동아리입니다.')
      this.$router.push('/club')
    }
  },
}
</script>

<style lang="scss" scoped>
.club-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.club-bg {
  width: 100%;
  height: 70vh;

  .club-bg-image {
    width: inherit;
    height: 100%;
    background-color: $grey-color-1;
    object-fit: cover;
  }
  .club-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    background-color: #272727aa;
  }
}

.club-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;

  & > div {
    position: absolute;
    bottom: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .club-header-center {
    padding: 0 32px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #ffffff;

    .club-logo {
      width: 128px;
      height: 128px;

      img {
        width: inherit;
        height: inherit;
        border-radius: 64px;
        object-fit: cover;
      }
    }
    .club-title {
      margin-left: 32px;

      .club-name {
        font-size: 32px;
        font-weight: 700;
      }
      .club-category {
        font-size: 18px;
        font-weight: 300;
      }
    }
  }
}

.club-center {
  margin: 32px 0;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
}

.club-info {
  flex: 1;
}

.club-info-main {
  padding: 16px;
  background-color: $primary-color-1;
}

.club-tags {
  font-weight: 700;
}

.club-tag {
  margin: 0 4px;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:only-child {
    margin: 0;
  }
}

.club-info-sub {
  padding: 16px;
  background-color: $grey-color-3;
}

.club-info-item {
  margin: 16px 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &:only-child {
    margin: 0;
  }
}

.club-label {
  font-weight: 700;
}

.club-content {
  flex: 4;
  padding: 16px;
}

@include viewpoint-xxl {
  .club-header-center {
    width: $breakpoint-xxl;
  }
  .club-center {
    width: $breakpoint-xxl;
  }
}
@include viewpoint-xl {
  .club-header-center {
    width: $breakpoint-xl;
  }
  .club-center {
    width: $breakpoint-xl;
  }
}
@include viewpoint-lg {
  .club-header-center {
    width: $breakpoint-lg;
  }
  .club-center {
    width: $breakpoint-lg;
  }
}
@include viewpoint-md {
  .club-header-center {
    width: $breakpoint-md;
  }
  .club-center {
    width: $breakpoint-md;
  }
}
@include viewpoint-sm {
  .club-header-center {
    width: $breakpoint-sm;
  }
  .club-center {
    width: $breakpoint-sm;
  }
}
</style>
