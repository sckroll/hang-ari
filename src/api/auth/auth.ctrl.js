/**
 * 사용자(user) 라우트에서 수행하는 함수 정의
 *
 * @author Sckroll
 */

import Joi from 'joi'
import Users from '../../models/user'

/**
 * 모든 사용자 정보 조회 API
 *
 * GET /api/auth
 */
export const getUsers = async (req, res, next) => {
  try {
    const result = await Users.find()
    res.send(result)
  } catch (e) {
    next(e)
  }
}

/**
 * 특정 사용자 정보 조회 API
 *
 * GET /api/auth/:email
 */
export const getUser = async (req, res, next) => {
  try {
    const email = req.params.email
    const result = await Users.findOne({ email })
    res.send(result)
  } catch (e) {
    next(e)
  }
}

/**
 * 회원가입 API
 *
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    // 필드 유효성 검사
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
    const result = schema.validate(req.body)
    if (result.error) {
      // 유효하지 않을 경우
      res.status = 400
      res.body = result.error
      return
    }

    // 이미 가입한 이메일인지 확인
    const exists = await Users.exists({ email: req.body.email })
    if (exists) {
      res.status = 409
      return
    }

    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      studentId: req.body.studentId,
      grade: req.body.grade,
      department: req.body.department,
      phoneNumber: req.body.phoneNumber,
      thumbnail: req.body.thumbnail,
    })
    await newUser.setPassword(req.body.password)
    await newUser.save()

    // Response body에서 암호화된 비밀번호 제거
    res.body = newUser.serialize()
  } catch (e) {
    next(e)
  }
}

/**
 * 로그인 API
 *
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    res.body = {}
  } catch (e) {
    next(e)
  }
}

/**
 * 로그아웃 API
 *
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    res.body = {}
  } catch (e) {
    next(e)
  }
}

/**
 * 사용자 정보를 수정
 *
 * PATCH /api/auth/:email
 */
export const modify = async (req, res, next) => {
  try {
    res.body = {}
  } catch (e) {
    next(e)
  }
}

/**
 * 사용자 정보 삭제 (회원탈퇴)
 *
 * DELETE /api/auth/:email
 */
export const remove = async (req, res, next) => {
  try {
    res.body = {}
  } catch (e) {
    next(e)
  }
}
