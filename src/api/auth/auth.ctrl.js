/**
 * 사용자 및 인증 관련(auth) 라우트의 비즈니스 로직 처리
 *
 * @author Sckroll
 */

import Joi from 'joi'
import User from '../../models/user'
import {
  DuplicateError,
  InvalidEmailError,
  InvalidPasswordError,
  InvalidUserError,
} from '../../lib/errors'

/**
 * 로그인 양식의 유효성을 검사하는 함수
 */
export const validateLoginForm = async form => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  await schema.validateAsync(form)
}

/**
 * 회원가입 양식의 유효성을 검사하는 함수
 */
export const validateRegForm = async form => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    studentId: Joi.string().required(),
    grade: Joi.number().required(),
    department: Joi.string().required(),
    phoneNumber: Joi.string(),
    thumbnail: Joi.string(),
  })
  await schema.validateAsync(form)
}

/**
 * 업데이트할 사용자 정보 양식의 유효성을 검사하는 함수
 */
export const validateUpdateForm = async form => {
  const schema = Joi.object()
    .keys({
      name: Joi.string(),
      grade: Joi.number(),
      department: Joi.string(),
      phoneNumber: Joi.string().allow(''),
      thumbnail: Joi.string().allow(''),
    })
    .required()
  await schema.validateAsync(form)
}

/**
 * 모든 사용자의 정보를 조회하는 함수
 */
export const getUsers = async () => {
  const users = await User.find()

  // 각 사용자의 도큐먼트 ID 및 암호화된 비밀번호 필드 제거
  return users.map(user => user.serialize())
}

/**
 * 특정 사용자의 정보를 조회하는 함수
 */
export const getUser = async email => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new InvalidUserError('user not found')
  }

  // 도큐먼트 ID 및 암호화된 비밀번호 필드 제거
  return user.serialize()
}

/**
 * 이메일의 중복을 검사하는 함수
 */
export const checkDuplicatedEmail = async email => {
  const exists = await User.exists({ email })
  if (exists) {
    throw new DuplicateError('duplicated email address')
  }
}

/**
 * 학번의 중복을 검사하는 함수
 */
export const checkDuplicatedSid = async studentId => {
  const exists = await User.exists({ studentId })
  if (exists) {
    throw new DuplicateError('duplicated student ID')
  }
}

/**
 * 새로운 사용자를 생성하는 함수
 */
export const register = async form => {
  // Request body에서 비밀번호 속성 분리
  const verifiedForm = { ...form }
  verifiedForm.password = undefined

  const user = new User(verifiedForm)

  // 비밀번호 암호화 후 저장
  await user.setPassword(form.password)
  await user.save()
}

/**
 * 이메일과 비밀번호를 검증 후 JWT 토큰을 반환하는 함수
 */
export const validateUser = async form => {
  // 해당 이메일의 사용자 조회
  let user = await User.findOne({ email: form.email })
  if (!user) {
    throw new InvalidEmailError('invalid email address')
  }

  // 비밀번호 검증
  const isValid = await user.checkPassword(form.password)
  if (!isValid) {
    throw new InvalidPasswordError('invalid password')
  }

  // 사용자 토큰 생성 후 반환
  return user.generateToken()
}

/**
 * 해당 이메일의 사용자 정보를 갱신하는 함수
 */
export const updateUser = async (email, fieldsToUpdate) => {
  const updated = await User.findOneAndUpdate({ email }, fieldsToUpdate, {
    new: true,
  })

  // 유효하지 않은 이메일 주소로 요청했다면 예외 처리
  if (!updated) {
    throw new InvalidUserError('user not found')
  }
}

/**
 * DB에서 해당 이메일의 사용자를 삭제하는 함수
 */
export const removeUser = async email => {
  const deleted = await User.findOneAndRemove({ email })

  // 유효하지 않은 이메일 주소로 요청했다면 예외 처리
  if (!deleted) {
    throw new InvalidUserError('user not found')
  }
}
