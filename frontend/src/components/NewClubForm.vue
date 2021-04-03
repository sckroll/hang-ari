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
          @change="
            formProp.key === 'logo' ? setLogo($event) : setBackground($event)
          "
        />
        <div class="error-message">
          {{ formProp.error }}
        </div>
        <div
          v-if="formProp.key === 'logo' && logoFile"
          :ref="formProp.key"
          class="thumbnail-preview"
        ></div>
        <div
          v-if="formProp.key === 'background' && backgroundFile"
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
        name: '',
        clubId: '',
        description: '',
        category: '',
        tags: '',
        homepage: '',
        room: '',
        professor: '',
        logo: '',
        background: '',
        establishedAt: '',
      },
      logoFile: null,
      backgroundFile: null,
      formProps: {
        name: {
          name: '동아리 이름',
          isRequired: true,
          error: '',
          placeholder: '동아리 이름',
        },
        clubId: {
          name: '동아리 URL (ID)',
          isRequired: true,
          error: '',
          placeholder:
            '영어 소문자, 숫자, 하이픈(-)으로 구성 (영어 소문자로 시작, 4자 이상)',
        },
        description: {
          name: '동아리 설명',
          isRequired: true,
          error: '',
          placeholder: '동아리에 대한 간략한 설명',
        },
        category: {
          name: '카테고리',
          isRequired: true,
          error: '',
          placeholder: '동아리 분류',
        },
        tags: {
          name: '태그',
          isRequired: true,
          error: '',
          placeholder: '각 태그는 쉼표(,)로 구분',
        },
        homepage: {
          name: '동아리 홈페이지',
          isRequired: false,
          error: '',
          placeholder: 'https://www.example.com',
        },
        room: {
          name: '동아리 방 위치',
          isRequired: false,
          error: '',
          placeholder: 'A101',
        },
        professor: {
          name: '지도교수',
          isRequired: false,
          error: '',
          placeholder: '지도교수 이름',
        },
        establishedAt: {
          name: '설립일자',
          isRequired: false,
          error: '',
          placeholder: 'YYYY-MM-DD (생략할 경우 오늘 날짜를 설립일자로 지정)',
        },
        logo: {
          name: '동아리 로고',
          isRequired: false,
          error: '',
          placeholder: '클릭하여 이미지 업로드 (.jpg/.png 권장)',
          type: 'file',
        },
        background: {
          name: '동아리 배경 사진',
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
    getName() {
      return { key: 'name', value: this.form.name }
    },
    getClubId() {
      return { key: 'clubId', value: this.form.clubId }
    },
    getDescription() {
      return { key: 'description', value: this.form.description }
    },
    getCategory() {
      return { key: 'category', value: this.form.category }
    },
    getTags() {
      return { key: 'tags', value: this.form.tags }
    },
    getHomepage() {
      return { key: 'homepage', value: this.form.homepage }
    },
    // getRoom() {
    //   return { key: 'room', value: this.form.room }
    // },
    // getProfessor() {
    //   return { key: 'professor', value: this.form.professor }
    // },
    getEstablishedAt() {
      return { key: 'establishedAt', value: this.form.establishedAt }
    },
    // getLogo() {
    //   return { key: 'logo', value: this.form.logo }
    // },
    // getBackground() {
    //   return { key: 'background', value: this.form.background }
    // },
  },
  watch: {
    getName({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
    },
    getClubId({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkClubId(this.formProps, key, value)
    },
    getDescription({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
    },
    getCategory({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      // 카테고리 유효성 검사
    },
    getTags({ key, value }) {
      if (!vf.checkRequired(this.formProps, key, value)) return
      vf.checkTags(this.formProps, key, value)
    },
    getHomepage({ key, value }) {
      if (vf.checkOptional(this.formProps, key, value)) return
      vf.checkUrl(this.formProps, key, value)
    },
    // getRoom({ key, value }) {},
    // getProfessor({ key, value }) {},
    getEstablishedAt({ key, value }) {
      if (vf.checkOptional(this.formProps, key, value)) return
      vf.checkDate(this.formProps, key, value)
    },
    // getLogo({ key, value }) {},
    // getBackground({ key, value }) {},
  },
  methods: {
    setLogo(file) {
      this.logoFile = file

      if (file) {
        const fReader = new FileReader()
        fReader.readAsDataURL(file)
        fReader.onloadend = ({ target }) => {
          this.$refs.logo[0].style.backgroundImage = `url(${target.result})`
        }
      }
    },
    setBackground(file) {
      this.backgroundFile = file

      if (file) {
        const fReader = new FileReader()
        fReader.readAsDataURL(file)
        fReader.onloadend = ({ target }) => {
          this.$refs.background[0].style.backgroundImage = `url(${target.result})`
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
          case 'clubId':
            result = vf.checkClubId(this.formProps, key, value)
            break
          case 'tags':
            result = vf.checkTags(this.formProps, key, value)
            break
          case 'homepage':
            if (vf.checkOptional(this.formProps, key, value)) break
            result = vf.checkUrl(this.formProps, key, value)
            break
          case 'establishedAt':
            if (vf.checkOptional(this.formProps, key, value)) break
            result = vf.checkDate(this.formProps, key, value)
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

      if (confirm('입력하신 정보로 동아리를 만드시겠습니까?')) {
        // form 객체의 속성들과 프로필 이미지 파일 객체를 formData에 저장
        const formData = new FormData()
        for (const item in this.form) {
          // form 객체에서 동아리 로고 및 배경 사진 이미지 파일명 속성 제거
          if (item === 'logo' || item === 'background') continue

          // form 객체에서 값이 없는 속성 제거
          if (this.form[item].length === 0) continue

          let value
          if (item === 'tags') {
            // 태그 항목일 경우 값을 쉼표 단위로 분리
            const splited = this.form[item].split(',')
            value = JSON.stringify(splited)
          } else if (item === 'establishedAt') {
            // 설립일자 항목일 경우 값을 Date 형식으로 변환
            value = new Date(this.form[item])
          } else {
            // 태그 항목을 제외한 모든 항목은 값을 그대로 사용
            value = this.form[item]
          }
          formData.append(item, value)
        }

        // 동아리 로고 및 배경 사진 이미지를 업로드했다면 formData에 파일 추가
        if (this.logoFile) {
          formData.append('logo', this.logoFile)
        }
        if (this.backgroundFile) {
          formData.append('background', this.backgroundFile)
        }

        // 회원 리스트를 formData에 추가
        const members = [
          {
            studentId: this.$store.getters.getUser.studentId,
            position: '회장',
            isPresident: true,
            isExecutive: true,
            isManager: true,
          },
        ]
        formData.append('members', JSON.stringify(members))

        try {
          await this.$axios.post('/api/club', formData)

          alert('동아리 생성이 완료되었습니다.')
          this.$router.push('/club')
        } catch (e) {
          const errorMessage = e.response.data.message
          let alertMessage
          if (errorMessage === 'duplicated club name') {
            alertMessage = vf.message.duplicatedClubName
          } else if (errorMessage === 'duplicated club id') {
            alertMessage = vf.message.duplicatedClubId
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
        this.logoFile = null
        this.backgroundFile = null

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
  background-color: #ffffff;

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
