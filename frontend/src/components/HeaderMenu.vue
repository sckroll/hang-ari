<template>
  <header>
    <div class="header-menu-container">
      <div class="header-menu-center">
        <div class="logo-container">
          <router-link to="/">
            <img src="../assets/ha_logo.png" alt="항아리" class="logo" />
          </router-link>
        </div>
        <div class="main-menu">
          <nav class="nav-menu">
            <ul>
              <li>
                <router-link to="/club">Club</router-link>
              </li>
              <li>
                <router-link to="/community">Community</router-link>
              </li>
              <li>
                <router-link to="/about">About</router-link>
              </li>
            </ul>
          </nav>
          <span class="user-info">
            <span class="user-name">김성찬</span>
            <div class="user-avatar"></div>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderMenu',
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 128px;
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

  & > a {
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

  & > a {
    font-family: 'Poppins', sans-serif;
    color: #000000;
    text-decoration: none;

    &.router-link-active {
      border-bottom: 3px solid $primary-color-0;
    }
  }

  &:hover {
    border-bottom: 3px solid $primary-color-0;
  }
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 32px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: $primary-color-0;
}
</style>
