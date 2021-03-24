export const message = {
  required: ' 항목을 입력해주세요.',
  email: '올바른 이메일 형식으로 입력해주세요.',
  min: '비밀번호 항목은 최소 8글자 이상 입력해주세요.',
  max: '비밀번호 항목은 최대 16글자까지 입력해주세요.',
  confirmed: '비밀번호가 일치하지 않습니다.',
  digits: '학번 항목은 10자리의 숫자만 입력할 수 있습니다.',
  between: '학년 항목은 1 ~ 5 사이의 숫자를 입력해주세요.',
  phoneNumber: '올바른 전화번호 형식으로 입력해주세요.',
  duplicatedEmail: '이미 가입된 이메일입니다.',
  duplicatedStudentId: '이미 가입된 학번입니다.',
  invalidEmail: '가입되지 않은 이메일입니다.',
  invalidPassword: '비밀번호가 올바르지 않습니다.',
  unknown: '서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.',
}

export const checkRequired = (formProps, key, value) => {
  if (value.length === 0) {
    formProps[key].error = formProps[key].name + message.required
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

export const checkOptional = (formProps, key, value) => {
  if (value.length === 0) {
    formProps[key].error = ''
    return true
  }
  return false
}

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

export const checkPassword = (formProps, key, value) => {
  if (value.length < 8) {
    formProps[key].error = message.min
    return false
  } else if (value.length > 16) {
    formProps[key].error = message.max
    return false
  } else {
    formProps[key].error = ''
    return true
  }
}

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
