<template>
  <button :class="getSize">
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
  mounted() {
    console.log(this.$el.classList.contains('asdf'))
  },
}
</script>

<style lang="scss" scoped>
button {
  border: 0;
  border-radius: 3px;
  margin: 8px;
  padding: 0;
  cursor: pointer;
  outline: none;
  background-color: $default-color-1;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: lighten($default-color-1, 10%);
  }

  &:active {
    background-color: darken($default-color-1, 5%);
  }
}

.small {
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

.medium {
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

.large {
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
</style>
