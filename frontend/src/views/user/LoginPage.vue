<template>
  <div class="login-container">
    <section class="login-center">
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
    </section>
  </div>
</template>

<script>
import HaInput from '@/components/common/HaInput.vue'
import HaButton from '@/components/common/HaButton.vue'

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
      message: {
        required: ' 항목을 입력해주세요.',
        email: '올바른 이메일 형식으로 입력해주세요.',
        invalidEmail: '가입되지 않은 이메일입니다.',
        invalidPassword: '비밀번호가 올바르지 않습니다.',
        unknown: '서버에 문제가 발생했습니다. 잠시 후에 다시 로그인해주세요.',
      },
      // eslint-disable-next-line no-useless-escape
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
      if (!this.checkRequired(key, value)) return
      this.checkEmail(key, value)
    },
    getPassword({ key, value }) {
      if (!this.checkRequired(key, value)) return
    },
  },
  methods: {
    checkRequired(key, value) {
      if (value.length === 0) {
        this.formProps[key].error =
          this.formProps[key].name + this.message.required
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    checkEmail(key, value) {
      const result = this.emailRegex.exec(value)
      if (!result) {
        this.formProps[key].error = this.message.email
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    validateForm() {
      let key,
        result = true

      key = 'email'
      if (!this.checkRequired(key, this.form[key])) {
        result = false
      } else {
        result = this.checkEmail(key, this.form[key])
      }

      if (result) {
        key = 'password'
        result = this.checkRequired(key, this.form[key])
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
          this.formProps.email.error = this.message.invalidEmail
        } else if (errorName === 'InvalidPasswordError') {
          this.formProps.password.error = this.message.invalidPassword
        } else {
          this.formProps.password.error = this.message.unknown
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
