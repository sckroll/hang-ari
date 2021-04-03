<template>
  <header>
    <div class="header-menu-container">
      <div class="header-menu-center">
        <div class="logo-container">
          <router-link to="/">
            <img
              v-if="isReversed"
              src="../assets/ha_logo_white.png"
              alt="항아리"
              class="logo"
            />
            <img v-else src="../assets/ha_logo.png" alt="항아리" class="logo" />
          </router-link>
        </div>
        <div class="main-menu">
          <nav class="nav-menu">
            <ul>
              <li :class="isReversed ? 'reverse' : ''">
                <router-link to="/club">Club</router-link>
              </li>
              <li :class="isReversed ? 'reverse' : ''">
                <router-link to="/community">Community</router-link>
              </li>
              <li :class="isReversed ? 'reverse' : ''">
                <router-link to="/about">About</router-link>
              </li>
            </ul>
          </nav>
          <span v-if="user" class="user-info">
            <span class="user-name" :class="isReversed ? 'reverse' : ''">{{
              user.name
            }}</span>
            <ha-avatar
              :thumbnail="user.thumbnail"
              @mouseover="contextMenu = true"
            />
            <ha-context-menu
              :contextMenu="contextMenu"
              :menu="menu"
              @mouseleave="contextMenu = false"
            />
          </span>
          <span v-else class="user-auth">
            <ul>
              <li :class="isReversed ? 'reverse' : ''">
                <router-link to="/register">회원가입</router-link>
              </li>
              <li :class="isReversed ? 'reverse' : ''">
                <router-link to="/login">로그인</router-link>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HaAvatar from '@/components/common/HaAvatar.vue'
import HaContextMenu from '@/components/common/HaContextMenu.vue'

export default {
  name: 'HeaderMenu',
  components: {
    HaAvatar,
    HaContextMenu,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      contextMenu: false,
      menu: [
        {
          name: '내 정보 수정',
          method: this.updateUser,
          isDisabled: false,
        },
        {
          name: '로그아웃',
          method: this.logout,
          isDisabled: false,
        },
      ],
    }
  },
  computed: {
    isReversed() {
      return this.$store.getters.getHeaderReversed
    },
  },
  watch: {
    isReversed: {
      immediate: true,
      handler() {},
    },
  },
  methods: {
    updateUser() {},
    async logout() {
      try {
        this.contextMenu = false
        await this.$axios.post('/api/auth/logout')

        // 로그아웃 후 홈(메인) 페이지로 이동
        this.$store.commit('deleteUser')
        if (this.$router.currentRoute.path !== '/') {
          this.$router.push('/')
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
  height: $header-height;
}

.header-menu-container {
  display: flex;
  align-items: flex-end;
  width: 1200px;
  margin-bottom: 16px;
}

.header-menu-center {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 32px;
}

.logo-container {
  height: 64px;

  > a {
    height: inherit;
  }
}

.logo {
  height: inherit;
}

.main-menu {
  display: flex;
  align-items: center;
  height: 64px;
  font-size: 20px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 32px;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;

  > a {
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    color: #000000;
    text-decoration: none;

    &.router-link-active {
      border-bottom: 3px solid $primary-color-0;
    }
  }

  &:hover {
    border-bottom: 3px solid $primary-color-0;
  }

  &.reverse > a {
    color: #ffffff;
    transition: all 0.2s ease;

    &.router-link-active {
      border-bottom: 3px solid #ffffff;
    }
  }

  &.reverse:hover {
    border-bottom: 3px solid #ffffff;
  }
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 32px;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-weight: 600;

  &.reverse {
    color: #ffffff;
  }
}

.user-auth {
  display: flex;
  align-items: center;

  li:last-child {
    margin-right: 0;
  }
}
</style>
