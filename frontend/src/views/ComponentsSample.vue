<template>
  <div>
    <div class="buttons">
      <div class="row">
        <ha-button sm1>sm1</ha-button>
        <ha-button sm2>sm2</ha-button>
        <ha-button sm3>sm3</ha-button>
      </div>
      <div class="row">
        <ha-button md1>md1</ha-button>
        <ha-button md2>md2</ha-button>
        <ha-button md3>md3</ha-button>
      </div>
      <div class="row">
        <ha-button lg1>lg1</ha-button>
        <ha-button lg2>lg2</ha-button>
        <ha-button lg3>lg3</ha-button>
      </div>
    </div>
  </div>
</template>

<script>
import haButton from '@/components/common/Button'

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
