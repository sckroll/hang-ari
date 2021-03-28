import moment from 'moment'

export const message = {
  required: ' 항목을 입력해주세요.',
  email: '올바른 이메일 형식으로 입력해주세요.',
  min: '비밀번호 항목은 최소 8글자 이상 입력해주세요.',
  max: '비밀번호 항목은 최대 16글자까지 입력해주세요.',
  confirmed: '비밀번호가 일치하지 않습니다.',
  digits: '학번 항목은 10자리의 숫자만 입력할 수 있습니다.',
  between: '학년 항목은 1 ~ 5 사이의 숫자를 입력해주세요.',
  phoneNumber: '올바른 전화번호 형식으로 입력해주세요.',
  url: '올바른 URL 형식으로 입력해주세요.',
  clubId:
    '영어 소문자로 시작하는 4자 이상의 영어 소문자, 숫자, 하이픈(-) 값이어야 합니다.',
  dateFormat: '설립일자는 YYYY-MM-DD 형식으로 입력해주세요. (ex: 2021-01-01)',
  dateTime: '',
  tags: '빈 문자열을 쉼표로 구분할 수 없습니다.',
  duplicatedEmail: '이미 가입된 이메일입니다.',
  duplicatedStudentId: '이미 가입된 학번입니다.',
  duplicatedClubName: '이미 존재하는 동아리 이름입니다.',
  duplicatedClubId: '이미 존재하는 동아리 URL입니다.',
  invalidEmail: '가입되지 않은 이메일입니다.',
  invalidPassword: '비밀번호가 올바르지 않습니다.',
  unknown: '서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.',
}

/**
 * 필수 입력 항목의 유효성을 검사하는 함수
 */
export const checkRequired = (formProps, key, value) => {
  if (value.length === 0) {
    formProps[key].error = formProps[key].name + message.required
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 선택 입력 항목의 유효성을 검사하는 함수
 * (별도의 입력 조건이 필요한 선택 입력 항목은 유효성 검사 시 본 함수도 같이 사용할 것)
 */
export const checkOptional = (formProps, key, value) => {
  if (value.length === 0) {
    formProps[key].error = ''
    return true
  }
  return false
}

/**
 * 이메일 항목의 유효성을 검사하는 함수
 */
export const checkEmail = (formProps, key, value) => {
  // https://emailregex.com/
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const result = emailRegex.exec(value)
  if (!result) {
    formProps[key].error = message.email
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 비밀번호 항목의 유효성을 검사하는 함수 (기본값: 8~16자 사이의 값)
 */
export const checkPassword = (formProps, key, value, min = 8, max = 16) => {
  if (value.length < min) {
    formProps[key].error = message.min
    return false
  } else if (value.length > max) {
    formProps[key].error = message.max
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 비밀번호 확인 항목의 유효성을 검사하는 함수
 */
export const checkConfirmed = (formProps, form, key, value, target) => {
  if (value !== form[target]) {
    if (target === 'password') {
      formProps[key].error = message.confirmed
    } else {
      if (form[target].length > 0) {
        formProps[key].error = message.confirmed
      }
    }
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 숫자 자릿수의 유효성을 검사하는 함수
 */
export const checkDigits = (formProps, key, value) => {
  // isNan(parseInt(val))로 하면 '123456789f' 입력 시 숫자로 인식해버림
  if (value.length !== 10 || isNaN(Number(value))) {
    formProps[key].error = message.digits
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 숫자 범위의 유효성을 검사하는 함수
 */
export const checkBetween = (formProps, key, value) => {
  if (isNaN(Number(value))) {
    formProps[key].error = message.between
    return false
  } else if (value < 1 || value > 5) {
    formProps[key].error = message.between
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 전화번호 항목의 유효성을 검사하는 항목 ("-" 생략)
 */
export const checkPhoneNumber = (formProps, key, value) => {
  if (isNaN(Number(value))) {
    formProps[key].error = message.phoneNumber
    return false
  } else if (value.length !== 11 || value.substring(0, 3) !== '010') {
    formProps[key].error = message.phoneNumber
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 홈페이지 URL의 유효성을 검사하는 함수
 */
export const checkUrl = (formProps, key, value) => {
  // https://regexr.com/3e6m0
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  const result = urlRegex.exec(value)
  if (!result) {
    formProps[key].error = message.url
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 동아리 URL(ID)의 유효성을 검사하는 함수
 * (영어 소문자, 숫자, 하이픈으로 구성, 영어 소문자로 시작, 4자 이상)
 */
export const checkClubId = (formProps, key, value) => {
  // eslint-disable-next-line no-useless-escape
  const clubIdRegex = /^[a-z][-a-z0-9]{3,}$/
  const result = clubIdRegex.exec(value)
  if (!result) {
    formProps[key].error = message.clubId
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 날짜 항목의 유효성을 검사하는 함수 (YYYY-MM-DD 형식)
 */
export const checkDate = (formProps, key, value) => {
  const result = moment(value, 'YYYY-MM-DD', true).isValid()
  if (!result) {
    formProps[key].error = message.dateFormat
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

/**
 * 태그 항목의 유효성을 검사하는 함수
 */
export const checkTags = (formProps, key, value) => {
  const result = value.split(',').includes('')
  if (result) {
    formProps[key].error = message.tags
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}
