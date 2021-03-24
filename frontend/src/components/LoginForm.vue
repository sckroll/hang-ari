<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <div v-for="formProp in getFormProps" :key="formProp.key">
      <div class="input-area">
        <ha-input
          v-model="form[formProp.key]"
          :type="formProp.type"
          :name="formProp.key"
          :placeholder="formProp.placeholder"
        />
        <div class="error-message">
          {{ formProp.error }}
        </div>
      </div>
    </div>
    <div class="action-area">
      <div class="action-button">
        <ha-button mdx color="secondary-0" type="submit">로그인</ha-button>
      </div>
    </div>
  </form>
</template>

<script>
import HaInput from '@/components/common/HaInput.vue'
import HaButton from '@/components/common/HaButton.vue'
import * as vf from '@/lib/validateForm.js'

export default {
  components: {
    HaInput,
    HaButton,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      formProps: {
        email: {
          name: '이메일',
          error: '',
          placeholder: '이메일',
        },
        password: {
          name: '비밀번호',
          error: '',
          placeholder: '비밀번호',
          type: 'password',
        },
      },
    }
  },
  computed: {
    getFormProps() {
      const formPropsArray = []
      for (const [key, value] of Object.entries(this.formProps)) {
        const formProp = { ...value }
        formProp.key = key
        formPropsArray.push(formProp)
      }
      return formPropsArray
    },
    getEmail() {
      return { key: 'email', value: this.form.email }
    },
    getPassword() {
      return { key: 'password', value: this.form.password }
    },
  },
  watch: {
    getEmail({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkEmail(this.formProps, key, value)
    },
    getPassword({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
    },
  },
  methods: {
    validateForm() {
      let key,
        result = true

      key = 'email'
      if (!vf.checkRequired(this.formProps, key, this.form[key])) {
        result = false
      } else {
        result = vf.checkEmail(this.formProps, key, this.form[key])
      }

      if (result) {
        key = 'password'
        result = vf.checkRequired(this.formProps, key, this.form[key])
      }
      return result
    },
    async onSubmit() {
      // 모든 항목에 대해 유효성 재검사
      const validateResult = this.validateForm()
      if (!validateResult) return

      try {
        const { data } = await this.axios.post('/api/auth/login', this.form)
        this.$store.commit('setUser', data)

        this.$router.push('/')
      } catch (e) {
        const errorName = e.response.data.name
        if (errorName === 'InvalidEmailError') {
          this.formProps.email.error = vf.message.invalidEmail
        } else if (errorName === 'InvalidPasswordError') {
          this.formProps.password.error = vf.message.invalidPassword
        } else {
          this.formProps.password.error = vf.message.unknown
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  padding: 32px;
  border-radius: $box-radius;
  box-shadow: 0 0 8px #66666666;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 256px;
  }
}

.input-area {
  display: flex;
  flex-direction: column;

  > .error-message {
    font-size: 14px;
    color: $error-color;
  }
}

.action-area {
  margin: 8px 0;
}

.action-button {
  padding: 8px 0;
}
</style>
