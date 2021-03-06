<template>
  <button :class="getSize + ' ' + color" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HAButton',
  props: {
    sm1: Boolean,
    sm2: Boolean,
    sm3: Boolean,
    md1: Boolean,
    md2: Boolean,
    md3: Boolean,
    lg1: Boolean,
    lg2: Boolean,
    lg3: Boolean,
    color: {
      type: String,
      default: 'primary-0',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultSize: 'medium-2',
      sizes: new Map([
        ['sm1', 'small-1'],
        ['sm2', 'small-2'],
        ['sm3', 'small-3'],
        ['md1', 'medium-1'],
        ['md2', 'medium-2'],
        ['md3', 'medium-3'],
        ['lg1', 'large-1'],
        ['lg2', 'large-2'],
        ['lg3', 'large-3'],
      ]),
    }
  },
  computed: {
    getSize() {
      let size
      for (const [key, value] of Object.entries(this.$props)) {
        if (value) {
          size = this.sizes.get(key)
          break
        }
      }
      if (!size) size = this.defaultSize
      return size
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  border: 0;
  border-radius: 3px;
  margin: 0 8px;
  padding: 0;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  @include change-button-color();

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  &.small {
    &-1 {
      width: 24px;
      height: 24px;
    }
    &-2 {
      width: 48px;
      height: 24px;
    }
    &-3 {
      width: 72px;
      height: 24px;
    }
  }
  &.medium {
    &-1 {
      width: 32px;
      height: 32px;
    }
    &-2 {
      width: 64px;
      height: 32px;
    }
    &-3 {
      width: 96px;
      height: 32px;
    }
  }
  &.large {
    &-1 {
      width: 40px;
      height: 40px;
    }
    &-2 {
      width: 80px;
      height: 40px;
    }
    &-3 {
      width: 120px;
      height: 40px;
    }
  }

  &.primary {
    &-0 {
      @include change-button-color($primary-color-0);
    }
    &-1 {
      @include change-button-color($primary-color-1);
    }
    &-2 {
      @include change-button-color($primary-color-2);
    }
    &-3 {
      @include change-button-color($primary-color-3);
    }
    &-4 {
      @include change-button-color($primary-color-4);
    }
  }
  &.secondary {
    &-0 {
      @include change-button-color($secondary-color-0);
    }
    &-1 {
      @include change-button-color($secondary-color-1);
    }
    &-2 {
      @include change-button-color($secondary-color-2);
    }
    &-3 {
      @include change-button-color($secondary-color-3);
    }
    &-4 {
      @include change-button-color($secondary-color-4);
    }
  }
}
</style>
