<template>
  <transition name="fade">
    <div
      v-if="contextMenu"
      class="context-menu-container"
      @mouseleave="$emit('mouseleave')"
    >
      <div class="avatar-mask"></div>
      <ul class="context-menu">
        <li v-for="item in menu" :key="item.name">
          <span @click="item.method">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HaContextMenu',
  props: {
    contextMenu: {
      type: Boolean,
      required: true,
    },
    menu: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > .avatar-mask {
    position: absolute;
    top: 56px;
    width: 48px;
    height: 64px;
  }

  > .context-menu {
    position: absolute;
    top: 120px;
    background-color: #ffffff;
    margin: 0;
    padding: 8px 0;
    border-radius: $box-radius;
    box-shadow: 0 0 8px #66666666;

    > li {
      list-style: none;
      padding: 8px 16px;
      font-size: 16px;
      text-align: right;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: $grey-color-4;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
