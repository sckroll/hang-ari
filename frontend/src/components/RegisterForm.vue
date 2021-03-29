<template>
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
          @change="setThumbnail"
        />
        <div class="error-message">
          {{ formProp.error }}
        </div>
        <div
          v-if="formProp.key === 'thumbnail' && thumbnailFile"
          :ref="formProp.key"
          class="thumbnail-preview"
        ></div>
      </div>
    </div>
    <div class="action-area">
      <ha-button lg3 color="secondary-4" type="reset">초기화</ha-button>
      <ha-button lg3 color="primary-0" type="submit">회원가입</ha-button>
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
        passwordConfirm: '',
        name: '',
        studentId: '',
        grade: '',
        department: '',
        phoneNumber: '',
        thumbnail: '',
      },
      thumbnailFile: null,
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
          placeholder: '클릭하여 이미지 업로드 (.jpg/.png 권장)',
          type: 'file',
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
  },
  watch: {
    getEmail({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkEmail(this.formProps, key, value)
    },
    getPassword({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkPassword(this.formProps, key, value)
      vf.checkConfirmed(
        this.formProps,
        this.form,
        'passwordConfirm',
        value,
        'passwordConfirm',
      )
    },
    getPasswordConfirm({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkConfirmed(this.formProps, this.form, key, value, 'password')
    },
    getName({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
    },
    getStudentId({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkDigits(this.formProps, key, value)
    },
    getGrade({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkBetween(this.formProps, key, value)
    },
    getDepartment({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
    },
    getPhoneNumber({ key, value }) {
      if (vf.checkOptional(this.formProps, key, value)) return
      vf.checkPhoneNumber(this.formProps, key, value)
    },
  },
  methods: {
    setThumbnail(file) {
      this.thumbnailFile = file

      if (file) {
        const fReader = new FileReader()
        fReader.readAsDataURL(file)
        fReader.onloadend = ({ target }) => {
          this.$refs.thumbnail[0].style.backgroundImage = `url(${target.result})`
        }
      }
    },
    validateForm() {
      let result = true

      for (const item in this.form) {
        const key = item
        const value = this.form[item]

        // 필수 입력 규칙 유효성 검사
        if (this.formProps[key].isRequired) {
          if (!vf.checkRequired(this.formProps, key, value)) {
            result = false
            break
          }
        }

        // 각 항목의 필수 입력 규칙을 제외한 모든 규칙 유효성 검사
        switch (key) {
          case 'email':
            result = vf.checkEmail(this.formProps, key, value)
            break
          case 'password':
            result = vf.checkPassword(this.formProps, key, value)
            result = vf.checkConfirmed(
              this.formProps,
              this.form,
              'passwordConfirm',
              value,
              'passwordConfirm',
            )
            break
          case 'passwordConfirm':
            result = vf.checkConfirmed(
              this.formProps,
              this.form,
              key,
              value,
              'password',
            )
            break
          case 'studentId':
            result = vf.checkDigits(this.formProps, key, value)
            break
          case 'grade':
            result = vf.checkBetween(this.formProps, key, value)
            break
          case 'phoneNumber':
            if (vf.checkOptional(this.formProps, key, value)) break
            result = vf.checkPhoneNumber(this.formProps, key, value)
            break
        }

        if (!result) break
      }

      return result
    },
    async onSubmit() {
      // 모든 항목에 대해 유효성 재검사
      const validateResult = this.validateForm()
      if (!validateResult) {
        alert('모든 양식을 올바르게 입력해주세요.')
        return
      }

      if (confirm('입력하신 정보로 가입하시겠습니까?')) {
        // form 객체의 속성들과 프로필 이미지 파일 객체를 formData에 저장
        const formData = new FormData()
        for (const item in this.form) {
          // form 객체에서 비밀번호 확인 속성 및 프로필 이미지 파일명 속성 제거
          if (item === 'passwordConfirm' || item === 'thumbnail') continue

          // form 객체에서 값이 없는 속성 제거
          if (this.form[item].length === 0) continue

          formData.append(item, this.form[item])
        }

        // 프로필 이미지를 업로드했다면 formData에 파일 추가
        if (this.thumbnailFile) {
          formData.append('thumbnail', this.thumbnailFile)
        }

        try {
          await this.axios.post('/api/auth/register', formData)

          alert('회원가입이 완료되었습니다.')
          this.$router.push('/login')
        } catch (e) {
          const errorMessage = e.response.data.message
          let alertMessage
          if (errorMessage === 'duplicated email address') {
            alertMessage = vf.message.duplicatedEmail
          } else if (errorMessage === 'duplicated student id') {
            alertMessage = vf.message.duplicatedStudentId
          } else {
            alertMessage = vf.message.unknown
          }
          alert(alertMessage)
        }
      }
    },
    onReset() {
      if (confirm('입력 양식을 초기화하시겠습니까?')) {
        for (const item in this.form) {
          this.form[item] = ''
        }
        for (const formProp of this.getFormProps) {
          formProp.error = ''
        }
        this.thumbnailFile = null

        alert('입력 양식을 초기화하였습니다.')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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

  > .error-message {
    font-size: 14px;
    color: $error-color;
  }

  > .thumbnail-preview {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-color: $grey-color-4;
    background-size: cover;
  }
}

.action-area {
  display: flex;
  justify-content: space-between;
}
</style>
