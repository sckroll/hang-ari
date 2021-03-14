<template>
  <div ref="input" class="input-container">
    <input
      :type="inputType"
      :name="name"
      :placeholder="placeholder"
      v-model.lazy="newValue"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="type === 'password'" class="visibility-toggle">
      <div
        v-if="!visibility"
        @click="visibility = !visibility"
        class="toggle-wrapper"
      >
        <fa-icon :icon="['fa', 'eye']" />
      </div>
      <div v-else @click="visibility = !visibility" class="toggle-wrapper">
        <fa-icon :icon="['fa', 'eye-slash']" />
      </div>
    </div>
  </div>
</template>

<script>
import { primaryColor0 } from '@/assets/scss/variables.scss'

export default {
  name: 'HaInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      inputType: 'text',
      visibility: true,
    }
  },
  computed: {
    newValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
        this.$emit('change', newValue)
        this.$emit('blur', newValue)
      },
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(value) {
        this.visibility = value !== 'password'
      },
    },
    visibility: {
      immediate: true,
      handler(value) {
        if (value) {
          this.inputType = this.type === 'password' ? 'text' : this.type
        } else {
          this.inputType = 'password'
        }
      },
    },
  },
  methods: {
    onFocus() {
      this.$refs.input.style.borderBottom = `3px solid ${primaryColor0}`
    },
    onBlur() {
      this.$refs.input.style.borderBottom = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  width: inherit;
  margin: 8px 0;
  border-top: 3px solid transparent;
  border-left: 0;
  border-right: 0;
  border-bottom: 3px solid $grey-color-3;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 3px solid $primary-color-4;
  }
}

input {
  width: 100%;
  outline: none;
  border: 0;
  padding: 5px 0;
}

.visibility-toggle {
  cursor: pointer;

  > .toggle-wrapper {
    color: $grey-color-1;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
      background-color: $grey-color-4;
    }
  }
}
</style>
