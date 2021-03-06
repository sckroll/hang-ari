<template>
  <div>
    <div class="buttons">
      <div class="row">
        <ha-button sm1>sm1</ha-button>
        <ha-button sm2 color="primary-1">sm2</ha-button>
        <ha-button sm3 color="primary-4">sm3</ha-button>
      </div>
      <div class="row">
        <ha-button md1 color="secondary-0">md1</ha-button>
        <ha-button md2 color="secondary-1">md2</ha-button>
        <ha-button md3 color="secondary-2">md3</ha-button>
      </div>
      <div class="row">
        <ha-button lg1 color="secondary-3">lg1</ha-button>
        <ha-button lg2 color="secondary-4">lg2</ha-button>
        <ha-button lg3 disabled>lg3</ha-button>
      </div>
    </div>
  </div>
</template>

<script>
import haButton from '@/components/common/HAButton'

export default {
  components: {
    haButton,
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  padding: 8px;
  background-color: #dddddd;
}
</style>
