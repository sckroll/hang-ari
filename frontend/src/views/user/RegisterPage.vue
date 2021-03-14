<template>
  <div class="register-container">
    <section class="register-intro">
      <div class="intro-message">
        <h1>
          한기대 동아리를 위한 커뮤니티 서비스,<br />
          항아리에 오신 것을 환영합니다!
        </h1>
        <h2>서비스 이용을 위해 아래의 양식을 작성해주세요.</h2>
      </div>
    </section>

    <section class="register-basic">
      <form
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
        class="form-container"
      >
        <div class="notice-area">
          * 표시는 필수 입력 항목을 의미합니다.
        </div>
        <div v-for="formProp in getFormProps" :key="formProp.key">
          <div class="input-area">
            <label :for="formProp.key" class="input-label">
              {{ formProp.name }}
              {{ formProp.isRequired ? '*' : '' }}
            </label>
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
          <ha-button lg3 color="secondary-4" type="reset">초기화</ha-button>
          <ha-button lg3 color="primary-0" type="submit">회원가입</ha-button>
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
        passwordConfirm: '',
        name: '',
        studentId: '',
        grade: '',
        department: '',
        phoneNumber: '',
        thumbnail: '',
      },
      formProps: {
        email: {
          name: '이메일',
          isRequired: true,
          error: '',
          placeholder: 'example@example.com',
        },
        password: {
          name: '비밀번호',
          isRequired: true,
          error: '',
          placeholder: '8자리 이상 16자리 이하',
          type: 'password',
        },
        passwordConfirm: {
          name: '비밀번호 확인',
          isRequired: true,
          error: '',
          placeholder: '8자리 이상 16자리 이하',
          type: 'password',
        },
        name: {
          name: '이름',
          isRequired: true,
          error: '',
          placeholder: '홍길동',
        },
        studentId: {
          name: '학번',
          isRequired: true,
          error: '',
          placeholder: '0000000000',
        },
        grade: {
          name: '학년',
          isRequired: true,
          error: '',
          placeholder: '1 ~ 5',
        },
        department: {
          name: '학부/학과',
          isRequired: true,
          error: '',
          placeholder: '컴퓨터공학부',
        },
        phoneNumber: {
          name: '전화번호',
          isRequired: false,
          error: '',
          placeholder: '01012345678 ("-" 생략, 010만 가능)',
        },
        thumbnail: {
          name: '프로필 이미지',
          isRequired: false,
          error: '',
        },
      },
      message: {
        required: ' 항목을 입력해주세요.',
        email: '올바른 이메일 형식으로 입력해주세요.',
        min: '비밀번호 항목은 최소 8글자 이상 입력해주세요.',
        max: '비밀번호 항목은 최대 16글자까지 입력해주세요.',
        confirmed: '비밀번호가 일치하지 않습니다.',
        digits: '학번 항목은 10자리의 숫자만 입력할 수 있습니다.',
        between: '학년 항목은 1 ~ 5 사이의 숫자를 입력해주세요.',
        phoneNumber: '올바른 전화번호 형식으로 입력해주세요.',
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
    getPasswordConfirm() {
      return { key: 'passwordConfirm', value: this.form.passwordConfirm }
    },
    getName() {
      return { key: 'name', value: this.form.name }
    },
    getStudentId() {
      return { key: 'studentId', value: this.form.studentId }
    },
    getGrade() {
      return { key: 'grade', value: this.form.grade }
    },
    getDepartment() {
      return { key: 'department', value: this.form.department }
    },
    getPhoneNumber() {
      return { key: 'phoneNumber', value: this.form.phoneNumber }
    },
    getThumbnail() {
      return { key: 'thumbnail', value: this.form.thumbnail }
    },
  },
  watch: {
    getEmail({ key, value }) {
      if (!this.checkRequired(key, value)) return
      this.checkEmail(key, value)
    },
    getPassword({ key, value }) {
      if (!this.checkRequired(key, value)) return
      this.checkPassword(key, value)
      this.checkConfirmed('passwordConfirm', value, 'passwordConfirm')
    },
    getPasswordConfirm({ key, value }) {
      if (!this.checkRequired(key, value)) return
      this.checkConfirmed(key, value, 'password')
    },
    getName({ key, value }) {
      if (!this.checkRequired(key, value)) return
    },
    getStudentId({ key, value }) {
      if (!this.checkRequired(key, value)) return
      this.checkDigits(key, value)
    },
    getGrade({ key, value }) {
      if (!this.checkRequired(key, value)) return
      this.checkBetween(key, value)
    },
    getDepartment({ key, value }) {
      if (!this.checkRequired(key, value)) return
    },
    getPhoneNumber({ key, value }) {
      if (this.checkOptional(key, value)) return
      this.checkPhoneNumber(key, value)
    },
    getThumbnail({ key, value }) {
      if (this.checkOptional(key, value)) return
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
    checkOptional(key, value) {
      if (value.length === 0) {
        this.formProps[key].error = ''
        return true
      }
      return false
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
    checkPassword(key, value) {
      if (value.length < 8) {
        this.formProps[key].error = this.message.min
        return false
      } else if (value.length > 16) {
        this.formProps[key].error = this.message.max
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    checkConfirmed(key, value, target) {
      if (value !== this.form[target]) {
        if (target === 'password') {
          this.formProps[key].error = this.message.confirmed
        } else {
          if (this.form[target].length > 0) {
            this.formProps[key].error = this.message.confirmed
          }
        }
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    checkDigits(key, value) {
      // isNan(parseInt(val))로 하면 '123456789f' 입력 시 숫자로 인식해버림
      if (value.length !== 10 || isNaN(Number(value))) {
        this.formProps[key].error = this.message.digits
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    checkBetween(key, value) {
      if (isNaN(Number(value))) {
        this.formProps[key].error = this.message.between
        return false
      } else if (value < 1 || value > 5) {
        this.formProps[key].error = this.message.between
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    checkPhoneNumber(key, value) {
      if (isNaN(Number(value))) {
        this.formProps[key].error = this.message.phoneNumber
        return false
      } else if (value.length !== 11 || value.substring(0, 3) !== '010') {
        this.formProps[key].error = this.message.phoneNumber
        return false
      } else {
        this.formProps[key].error = ''
        return true
      }
    },
    async onSubmit() {
      console.log('good')

      // 모든 항목에 대해 유효성 재검사

      // 이상이 없으면 form 객체에서 비밀번호 확인 속성 제거 후 객체를 서버로 전송
      // delete this.form.passwordConfirm
      // try {

      // } catch (e) {
      //   console.error(e)
      // }
    },
    onReset() {
      for (const item in this.form) {
        this.form[item] = ''
      }
      for (const formProp of this.getFormProps) {
        formProp.error = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 28px;
}

h2 {
  font-size: 20px;
  font-weight: 400;
}

.register-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-intro {
  width: 100%;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.register-basic {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
}

.form-container {
  padding: 32px;
  border-radius: $box-radius;
  box-shadow: 0 0 8px #66666666;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 512px;
    margin: 16px;
  }
}

.notice-area {
  color: $primary-color-1;
}

.input-area {
  display: flex;
  flex-direction: column;

  > .input-label {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }

  > input {
    margin: 8px 0;
  }

  > .error-message {
    font-size: 14px;
    color: $error-color;
  }
}

.action-area {
  display: flex;
  justify-content: space-between;
}
</style>
