/**
 * 사용자 및 인증 관련(auth) 라우트 설정 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import * as authCtrl from './auth.ctrl'
import authCheck from '../../lib/authCheck'
import { uploadThumbnail } from '../../lib/imageUpload'

const authRouter = Router()

// 쿼리에 따른 사용자 조회 (이름, 이메일, 학번, 학년, 학부/학과)
// GET /api/auth{?name,email,studentId,grade,department}
authRouter.get('/', async (req, res, next) => {
  try {
    const query = req.query
    const users = await authCtrl.getUser(query)
    res.send(users)
  } catch (e) {
    next(e)
  }
})

// 회원가입
// POST /api/auth/register
authRouter.post('/register', uploadThumbnail, async (req, res, next) => {
  try {
    const form = req.body
    const thumbnail = req.file

    // 회원가입 양식 유효성 검사
    await authCtrl.validateRegForm(form)

    // 이미 가입한 이메일 및 학번인지 확인
    await authCtrl.checkDuplicatedEmail(form.email)
    await authCtrl.checkDuplicatedSid(form.studentId)

    // 새로운 사용자 생성
    await authCtrl.register(form, thumbnail)

    res.status(201).end()
  } catch (e) {
    next(e)
  }
})

// 로그인
// POST /api/auth/login
authRouter.post('/login', async (req, res, next) => {
  try {
    const form = req.body

    // 로그인 양식 유효성 검사
    await authCtrl.validateLoginForm(form)

    // 해당 사용자가 가입되어 있는지 확인
    const { token, user } = await authCtrl.validateUser(form)

    // 쿠키에 토큰 저장 후 사용자 정보 반환
    const maxAge = parseInt(process.env.JWT_MAX_AGE)
    res.cookie('hangari_token', token, {
      maxAge,
      httpOnly: true,
    })
    res.send(user)
  } catch (e) {
    next(e)
  }
})

// 로그아웃
// POST /api/auth/logout
authRouter.post('/logout', authCheck, (req, res) => {
  // 전역 객체에 저장된 사용자 정보 삭제
  req.app.locals.user = undefined

  // 쿠키 삭제
  res.clearCookie('hangari_token')
  res.status(204).end()
})

// 사용자 정보 수정
// PATCH /api/auth/:email
authRouter.patch('/:email', authCheck, async (req, res, next) => {
  try {
    const { email } = req.params
    const form = req.body

    // 업데이트할 사용자 정보 양식 유효성 검사
    await authCtrl.validateUpdateForm(form)

    // 사용자 정보 업데이트
    await authCtrl.updateUser(email, form)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 사용자 정보 삭제
// DELETE /api/auth/:email
authRouter.delete('/:email', authCheck, async (req, res, next) => {
  try {
    const { email } = req.params

    // 해당 사용자 삭제
    await authCtrl.removeUser(email)

    // 쿠키 삭제
    res.clearCookie('hangari_token')
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 프론트엔드로부터 로그인 여부 확인
// GET /api/auth/check
authRouter.get('/check', (req, res) => {
  const cookie = req.app.locals.user
  if (cookie) {
    cookie._id = cookie.hashedPassword = undefined
  }
  res.send(cookie)
})

export default authRouter
