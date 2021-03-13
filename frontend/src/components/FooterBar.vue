<template>
  <footer>
    <div class="footer-container">
      <div class="footer-center">
        <div class="logo">
          <img src="../assets/ha_logo_white.png" alt="항아리" />
          <div class="logo-title">Hang-ari</div>
        </div>
        <div class="info">
          <div class="links">
            <a
              href="https://github.com/sckroll/hang-ari"
              target="_blank"
              class="link"
            >
              <fa-icon :icon="['fab', 'github']" />
            </a>
            <a href="mailto://kimsc0714@gmail.com" class="link">
              <fa-icon :icon="['fa', 'envelope']" />
            </a>
          </div>
          <div class="additional-info">
            주의: 토이 프로젝트로 개발된 페이지입니다. 실제로 운영되는
            커뮤니티가 아닙니다.
          </div>
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }} Sckroll.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: $footer-height;
  background-color: $primary-color-0;
  color: #ffffff;

  & .footer-container {
    width: 1200px;
  }

  & .footer-center {
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .logo {
    height: 64px;
    display: flex;
    align-items: center;

    & > img {
      height: inherit;
    }
    & .logo-title {
      margin-left: 16px;
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      font-weight: 600;
    }
  }

  & .links {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    font-size: 20px;

    & .link {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
      width: 32px;
      height: 32px;
      border-radius: 16px;
      background-color: #ffffff;
      color: $primary-color-0;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  & .info {
    text-align: right;
  }
}
</style>
