<template>
  <input
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    type="text"
  />
</template>

<script>
export default {
  name: 'HaInput',
  props: {
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
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
  padding: 5px 8px;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: $grey-color-4;
  }
  &:focus {
    border-bottom: 3px solid $primary-color-0;
    background-color: $grey-color-4;
  }
}
</style>
