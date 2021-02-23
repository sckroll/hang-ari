/**
 * 사용자 및 인증 관련(auth) 라우트 설정 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import * as authCtrl from './auth.ctrl'

// 토큰 유효 기간 (ms)
const maxAge = 1000 * 60 * 60 * 24 // 1일

const authRouter = Router()

// 모든 사용자 정보 조회
// GET /api/auth
authRouter.get('/', async (req, res, next) => {
  try {
    const users = await authCtrl.getUsers()
    res.send(users)
  } catch (e) {
    next(e)
  }
})

// 특정 사용자 정보 조회
// GET /api/auth/:email
authRouter.get('/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const user = await authCtrl.getUser(email)
    res.send(user)
  } catch (e) {
    next(e)
  }
})

// 회원가입
// POST /api/auth/register
authRouter.post('/register', async (req, res, next) => {
  try {
    const form = req.body

    // 회원가입 양식 유효성 검사
    await authCtrl.validateRegForm(form)

    // 이미 가입한 이메일인지 확인
    await authCtrl.checkDuplicatedEmail(form.email)

    // 새로운 사용자 생성
    const user = await authCtrl.register(form)
    res.send(user)
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

    // 해당 사용자가 가입되어 있으면 사용자와 토큰 반환
    const { user, token } = await authCtrl.validateUser(form)

    // 쿠키에 토큰 저장 후 사용자 정보 반환
    res.cookie('access_token', token, {
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
authRouter.post('/logout', (req, res) => {
  res.cookie('access_token')
  res.status(204).end()
})

// 사용자 정보 수정
// PATCH /api/auth/:email
authRouter.patch('/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const form = req.body

    // 유효한 이메일 주소인지 검사
    await authCtrl.checkValidEmail(email)

    // 업데이트할 사용자 정보 양식 유효성 검사
    await authCtrl.validateUpdateForm(form)

    const updated = await authCtrl.updateUser(email, form)
    res.send(updated)
  } catch (e) {
    next(e)
  }
})

// 사용자 정보 삭제
// DELETE /api/auth/:email
authRouter.delete('/:email', async (req, res, next) => {
  try {
    const email = req.params.email

    // 유효한 이메일 주소인지 검사
    await authCtrl.checkValidEmail(email)

    // 해당 사용자 삭제
    await authCtrl.removeUser(email)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

export default authRouter
