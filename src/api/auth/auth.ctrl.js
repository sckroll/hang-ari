/**
 * 사용자 및 인증 관련(auth) 라우트의 비즈니스 로직 처리
 *
 * @author Sckroll
 */

import Joi from 'joi'
import User from '../../models/user'

/**
 * 사용자의 정보를 조회하는 함수
 */
export const getUsers = async () => {
  const users = await User.find()
  return users
}

/**
 * 특정 사용자의 정보를 조회하는 함수
 */
export const getUser = async email => {
  const user = await User.findOne({ email })
  return user
}

/**
 * 회원가입 양식의 유효성을 검사하는 함수
 */
export const validateRegForm = form => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    studentId: Joi.string().required(),
    grade: Joi.number().required(),
    department: Joi.string().required(),
    phoneNumber: Joi.string(),
    thumbnail: Joi.string(),
  })
  const result = schema.validate(form)
  return result.error
}

/**
 * 이메일의 중복을 검사하는 함수
 */
export const checkEmail = async email => {
  const exists = await User.exists({ email })
  return exists
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

  // Response body에서 암호화된 비밀번호 제거
  return user.serialize()
}

/**
 * 로그인 양식의 유효성을 검사하는 함수
 */
export const validateLoginForm = form => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  const result = schema.validate(form)
  return result
}

/**
 * 이메일과 비밀번호를 검증 후 해당 사용자를 반환하는 함수
 */
export const validateUser = async form => {
  // 해당 이메일의 사용자 조회
  const user = await User.findOne(form)
  if (!user) {
    return { isError: true }
  }

  // 비밀번호 검증
  const isValid = await user.checkPassword(form.password)
  if (!isValid) {
    return { isError: true }
  }

  // 암호화된 비밀번호 필드 제거 후 리턴
  return user.serialize()
}
