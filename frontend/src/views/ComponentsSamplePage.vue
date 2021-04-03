<template>
  <div class="main-container">
    <div class="empty-top"></div>
    <div class="main-center">
      <h1>Hang-ari Components</h1>
      <div class="component">
        <h2 class="title">Colors</h2>
        <p>
          한국기술교육대학교(KOREATECH) 홈페이지에 사용된 색상을 기반으로
          구성했습니다.
        </p>

        <h3>Primary</h3>
        <div class="color-bar-wrapper">
          <div class="color-bar primary-0">
            <span>primary-0</span>
            <span>{{ colors.primaryColor0 }}</span>
          </div>
          <br />
          <div class="color-bar primary-1">
            <span>primary-1</span>
            <span>{{ colors.primaryColor1 }}</span>
          </div>
          <div class="color-bar primary-2">
            <span>primary-2</span>
            <span>{{ colors.primaryColor2 }}</span>
          </div>
          <div class="color-bar primary-3">
            <span>primary-3</span>
            <span>{{ colors.primaryColor3 }}</span>
          </div>
          <div class="color-bar primary-4">
            <span>primary-4</span>
            <span>{{ colors.primaryColor4 }}</span>
          </div>
        </div>

        <br />

        <h3>Secondary</h3>
        <div class="color-bar-wrapper">
          <div class="color-bar secondary-0">
            <span>secondary-0</span>
            <span>{{ colors.secondaryColor0 }}</span>
          </div>
          <br />
          <div class="color-bar secondary-1">
            <span>secondary-1</span>
            <span>{{ colors.secondaryColor1 }}</span>
          </div>
          <div class="color-bar secondary-2">
            <span>secondary-2</span>
            <span>{{ colors.secondaryColor2 }}</span>
          </div>
          <div class="color-bar secondary-3">
            <span>secondary-3</span>
            <span>{{ colors.secondaryColor3 }}</span>
          </div>
          <div class="color-bar secondary-4">
            <span>secondary-4</span>
            <span>{{ colors.secondaryColor4 }}</span>
          </div>
        </div>

        <br />

        <h3>Grey</h3>
        <div class="color-bar-wrapper">
          <div class="color-bar grey-1">
            <span>grey-1</span>
            <span>{{ colors.greyColor1 }}</span>
          </div>
          <div class="color-bar grey-2">
            <span>grey-2</span>
            <span>{{ colors.greyColor2 }}</span>
          </div>
          <div class="color-bar grey-3">
            <span>grey-3</span>
            <span>{{ colors.greyColor3 }}</span>
          </div>
          <div class="color-bar grey-4">
            <span>grey-4</span>
            <span>{{ colors.greyColor4 }}</span>
          </div>
        </div>

        <br />

        <h3>Etc.</h3>
        <div class="color-bar-wrapper">
          <div class="color-bar error">
            <span>error</span>
            <span>{{ colors.errorColor }}</span>
          </div>
          <div class="color-bar grey-2">
            <span>disabled (grey-2)</span>
            <span>{{ colors.disabledColor }}</span>
          </div>
        </div>
      </div>

      <div class="component">
        <h2 class="title">Buttons</h2>
        <p>
          버튼의 속성으로 들어가는 이름은 다음과 같이 구성되어 있습니다.
          <br />
          <strong>크기 (sm, md, lg) + 너비 배수 (1, 2, 3, x)</strong>
          <br />
          너비 배수는 생략이 가능하며, 생략할 경우 버튼의 너비는 텍스트에 따라
          유동적으로 변화합니다.
          <br />
          그리고 너비 배수를 x로 설정하면 너비가 100%인 버튼이 됩니다.
          <br />
          주의: <strong>너비 배수가 1</strong>인 버튼은 아이콘만 허용됩니다.
          <br /><br />
          아래 예시는
          <strong
            >1배수, 2배수, 3배수, 배수 생략, 배수 생략, 배수 생략(비활성), 너비
            100%
          </strong>
          순입니다.
        </p>

        <h3>Small</h3>
        <div class="row">
          <ha-button sm1><fa-icon icon="eye"/></ha-button>
          <ha-button sm2>sm2</ha-button>
          <ha-button sm3>sm3</ha-button>
          <ha-button sm>s</ha-button>
          <ha-button sm>small button</ha-button>
          <ha-button sm disabled>disabled</ha-button>
          <ha-button smx>smx</ha-button>
        </div>

        <h3>Medium</h3>
        <div class="row">
          <ha-button md1 color="secondary-0"><fa-icon icon="eye"/></ha-button>
          <ha-button md2 color="secondary-0">md2</ha-button>
          <ha-button md3 color="secondary-0">md3</ha-button>
          <ha-button md color="secondary-0">m</ha-button>
          <ha-button md color="secondary-0">medium button</ha-button>
          <ha-button md color="secondary-0" disabled>disabled</ha-button>
          <ha-button mdx color="secondary-0">mdx</ha-button>
        </div>

        <h3>Large</h3>
        <div class="row">
          <ha-button lg1 color="secondary-4"><fa-icon icon="eye"/></ha-button>
          <ha-button lg2 color="secondary-4">lg2</ha-button>
          <ha-button lg3 color="secondary-4">lg3</ha-button>
          <ha-button lg color="secondary-4">l</ha-button>
          <ha-button lg color="secondary-4">large button</ha-button>
          <ha-button lg color="secondary-4" disabled>disabled</ha-button>
          <ha-button lgx color="secondary-4">lgx</ha-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '@/assets/scss/variables.scss'
import HaButton from '@/components/common/HaButton.vue'

export default {
  components: {
    HaButton,
  },
  data() {
    return {
      colors,
    }
  },
}
</script>

<style lang="scss" scoped>
.component {
  margin-bottom: 32px;
}

.color-bar {
  display: flex;
  justify-content: space-between;
  padding: 8px;

  &.primary {
    &-0 {
      @include set-color($primary-color-0);
    }
    &-1 {
      @include set-color($primary-color-1);
    }
    &-2 {
      @include set-color($primary-color-2);
    }
    &-3 {
      @include set-color($primary-color-3);
    }
    &-4 {
      @include set-color($primary-color-4);
    }
  }
  &.secondary {
    &-0 {
      @include set-color($secondary-color-0);
    }
    &-1 {
      @include set-color($secondary-color-1);
    }
    &-2 {
      @include set-color($secondary-color-2);
    }
    &-3 {
      @include set-color($secondary-color-3);
    }
    &-4 {
      @include set-color($secondary-color-4);
    }
  }
  &.grey {
    &-1 {
      @include set-color($grey-color-1);
    }
    &-2 {
      @include set-color($grey-color-2);
    }
    &-3 {
      @include set-color($grey-color-3);
    }
    &-4 {
      @include set-color($grey-color-4);
    }
  }
  &.error {
    @include set-color($error-color);
  }
}

.row {
  display: flex;
}
</style>
