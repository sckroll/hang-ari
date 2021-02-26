/**
 * 각 에러에 따른 상태 코드를 반환하는 객체
 */
export const statusCode = {
  ValidationError: 400,
  AuthError: 401,
  JsonWebTokenError: 401,
  InvalidEmailError: 401,
  InvalidPasswordError: 401,
  InvalidUserError: 404,
  InvalidClubError: 404,
  InvalidMemberError: 404,
  DuplicateError: 409,
}

/**
 * 가입할 사용자의 필드값 중복 에러
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
 * 가입하지 않은 사용자의 이메일 주소 에러
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

/**
 * 존재하지 않는 사용자 이메일 주소 에러
 */
export class InvalidUserError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'InvalidUserError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidUserError)
    }
  }
}

/**
 * 사용자 인증 에러
 */
export class AuthError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'AuthError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError)
    }
  }
}

/**
 * 존재하지 않는 동아리 에러
 */
export class InvalidClubError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'InvalidClubError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidClubError)
    }
  }
}

/**
 * 존재하지 않는 동아리 회원 에러
 */
export class InvalidMemberError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'InvalidMemberError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidMemberError)
    }
  }
}
