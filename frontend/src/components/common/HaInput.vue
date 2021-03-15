<template>
  <div ref="container" class="input-container">
    <div v-if="type === 'file'" class="file-upload-button" @click="openFile">
      <span v-if="file" class="file-uploaded">{{ filename }}</span>
      <span v-else class="file-placeholder">{{ placeholder }}</span>
    </div>
    <input
      ref="input"
      :type="inputType"
      :name="name"
      :placeholder="placeholder"
      v-model.lazy="newValue"
      accept="image/jpeg, image/png"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
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
      file: null,
    }
  },
  computed: {
    newValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
        // this.$emit('change', newValue)
        this.$emit('blur', newValue)
      },
    },
    filename() {
      const maxLength = 50
      const name = this.file.name
      if (name.length > maxLength) {
        return name.substring(0, maxLength) + '...'
      } else {
        return name
      }
    },
  },
  watch: {
    value(val) {
      if (this.type === 'file' && val === '') {
        this.file = null
      }
    },
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
      this.$refs.container.style.borderBottom = `3px solid ${primaryColor0}`
    },
    onBlur() {
      this.$refs.container.style.borderBottom = ''
    },
    onChange({ target }) {
      if (this.type !== 'file') return

      this.file = target.files[0]
      this.$emit('change', this.file)
    },
    openFile() {
      const file = this.$refs.input
      file.click()
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
  height: 22px;
  outline: none;
  border: 0;
  padding: 5px 0;

  &::placeholder {
    color: $grey-color-2;
  }

  &[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    border: 0;
  }
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

.file-upload-button {
  cursor: pointer;
  width: 100%;
  height: 22px;
  padding: 5px 0;
  font-size: 14px;

  > .file-uploaded {
    color: #000000;
  }
  > .file-placeholder {
    color: $grey-color-2;
  }
}
</style>
