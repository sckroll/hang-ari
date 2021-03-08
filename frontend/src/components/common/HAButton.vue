<template>
  <button :class="getSize + ' ' + color" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HAButton',
  props: {
    sm: Boolean,
    sm1: Boolean,
    sm2: Boolean,
    sm3: Boolean,
    md: Boolean,
    md1: Boolean,
    md2: Boolean,
    md3: Boolean,
    lg: Boolean,
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
      defaultSize: 'medium',
      sizes: new Map([
        ['sm', 'small'],
        ['sm1', 'small-1'],
        ['sm2', 'small-2'],
        ['sm3', 'small-3'],
        ['md', 'medium'],
        ['md1', 'medium-1'],
        ['md2', 'medium-2'],
        ['md3', 'medium-3'],
        ['lg', 'large'],
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
  cursor: pointer;
  outline: none;
  vertical-align: text-bottom;
  transition: all 0.2s ease;
  @include change-button-color();

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  &.small {
    & {
      min-width: $small-width;
      height: $small-width;
      padding: 0 ($small-width / 3);
      font-size: $small-font;
    }
    &-1 {
      width: $small-width;
      height: $small-width;
      font-size: $small-font;
    }
    &-2 {
      width: $small-width * 2;
      height: $small-width;
      padding: 0 ($small-width / 3);
      font-size: $small-font;
    }
    &-3 {
      width: $small-width * 3;
      height: $small-width;
      padding: 0 ($small-width / 3);
      font-size: $small-font;
    }
  }
  &.medium {
    & {
      min-width: $medium-width;
      height: $medium-width;
      padding: 0 ($medium-width / 3);
      font-size: $medium-font;
    }
    &-1 {
      width: $medium-width;
      height: $medium-width;
      font-size: $medium-font;
    }
    &-2 {
      width: $medium-width * 2;
      height: $medium-width;
      padding: 0 ($medium-width / 3);
      font-size: $medium-font;
    }
    &-3 {
      width: $medium-width * 3;
      height: $medium-width;
      padding: 0 ($medium-width / 3);
      font-size: $medium-font;
    }
  }
  &.large {
    & {
      min-width: $large-width;
      height: $large-width;
      padding: 0 ($large-width / 3);
      font-size: $large-font;
    }
    &-1 {
      width: $large-width;
      height: $large-width;
      font-size: $large-font;
    }
    &-2 {
      width: $large-width * 2;
      height: $large-width;
      padding: 0 ($large-width / 3);
      font-size: $large-font;
    }
    &-3 {
      width: $large-width * 3;
      height: $large-width;
      padding: 0 ($large-width / 3);
      font-size: $large-font;
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
