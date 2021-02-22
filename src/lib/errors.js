/**
 * 가입할 회원의 이메일 주소 중복 에러
 */
export class DuplicateError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'DuplicateError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DuplicateError)
    }
  }
}

/**
 * 가입하지 않은 회원의 이메일 주소 에러
 */
export class InvalidEmailError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'InvalidEmailError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidEmailError)
    }
  }
}

/**
 * 올바르지 않은 비밀번호 에러
 */
export class InvalidPasswordError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'InvalidPasswordError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPasswordError)
    }
  }
}
