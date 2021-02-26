/**
 * 동아리 (club) 라우트 설정 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import * as clubCtrl from './club.ctrl'
import authCheck from '../../lib/authCheck'

const clubRouter = Router()

// 모든 동아리 정보 조회
// GET /api/club
clubRouter.get('/', async (req, res, next) => {
  try {
    const clubs = await clubCtrl.getClubs()
    res.send(clubs)
  } catch (e) {
    next(e)
  }
})

// 동아리 ID로 특정 동아리 정보 조회
// GET /api/club/:id
clubRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const club = await clubCtrl.getClubById(id)
    res.send(club)
  } catch (e) {
    next(e)
  }
})

// 동아리 이름으로 특정 동아리 정보 조회
// GET /api/club/:name
clubRouter.get('/:name', async (req, res, next) => {
  try {
    const name = req.params.name
    const club = await clubCtrl.getClubByName(name)
    res.send(club)
  } catch (e) {
    next(e)
  }
})

// 동아리 생성
// POST /api/club
clubRouter.post('/', authCheck, async (req, res, next) => {
  try {
    const { club, members } = req.body

    // 동아리 및 동아리 회원 양식 유효성 검사
    await clubCtrl.validateClubForm(club)
    await clubCtrl.validateMemberForm(members)

    // 이미 해당 ID와 이름으로 동아리가 만들어졌는지 검사
    await clubCtrl.checkDuplicatedId(club.clubId)
    await clubCtrl.checkDuplicatedName(club.name)

    // 새로운 동아리 생성
    const clubDocId = await clubCtrl.createClub(club)

    // 동아리 회원 추가
    await clubCtrl.addMember(clubDocId, members)

    res.status(201).end()
  } catch (e) {
    next(e)
  }
})

// 동아리 정보 변경
// PATCH /api/club/:id
clubRouter.patch('/:id', authCheck, async (req, res, next) => {
  try {
    const id = req.params.id
    const form = req.body

    // 동아리 정보 양식 유효성 검사
    await clubCtrl.validateUpdateForm(form)

    // 동아리 이름을 변경할 경우 중복되지 않는지 검사
    if (form.name) {
      await clubCtrl.checkDuplicatedName(form.name)
    }

    // 동아리 정보 업데이트
    await clubCtrl.updateClub(id, form)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 동아리 삭제
// DELETE /api/club/:id
clubRouter.delete('/:id', authCheck, async (req, res, next) => {
  try {
    const id = req.params.id

    await clubCtrl.removeClub(id)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 전체 조회
// GET /api/club/member/:name
clubRouter.get('/member/:name', async (req, res, next) => {
  try {
    const name = req.params.name

    res.send()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 추가
// POST /api/club/member
clubRouter.post('/member', authCheck, async (req, res, next) => {
  try {
    const form = req.body

    res.send()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 직책 변경
// PATCH /api/club/member/:name/:email
clubRouter.patch('/member/:name/:email', authCheck, async (req, res, next) => {
  try {
    const { name, email } = req.params
    const form = req.body

    // 동아리 및 동아리 회원 도큐먼트 ID 추출

    // 해당 동아리의 회원 직책 변경

    res.send()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 탈퇴
// DELETE /api/club/member/:name/:email
clubRouter.delete('/member/:name/:email', authCheck, async (req, res, next) => {
  try {
    const { name, email } = req.params

    // 동아리 및 동아리 회원 도큐먼트 ID 추출

    // 해당 동아리에서 탈퇴

    res.send()
  } catch (e) {
    next(e)
  }
})

export default clubRouter
