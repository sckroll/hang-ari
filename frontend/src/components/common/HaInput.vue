<template>
  <input :type="type" :placeholder="placeholder" v-model.lazy="val" />
</template>

<script>
export default {
  name: 'HaInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  outline: none;
  border-top: 3px solid transparent;
  border-left: 0;
  border-right: 0;
  border-bottom: 3px solid $grey-color-3;
  padding: 5px 0;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 3px solid $primary-color-4;
  }
  &:focus {
    border-bottom: 3px solid $primary-color-0;
  }
}
</style>