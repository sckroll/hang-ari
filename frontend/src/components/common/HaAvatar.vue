<template>
  <div class="user-avatar" @mouseover="$emit('mouseover')"></div>
</template>

<script>
export default {
  name: 'HaAvatar',
  props: {
    thumbnail: {
      type: String,
    },
  },
  mounted() {
    this.$el.style.background = `url(${this.thumbnail})`
    this.$el.style.backgroundSize = 'cover'
  },
}
</script>

<style lang="scss" scoped>
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: $primary-color-0;
}
</style>
