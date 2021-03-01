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
    const user = req.app.locals.user

    // 동아리 및 동아리 회원 양식 유효성 검사
    await clubCtrl.validateClubForm(club)
    await clubCtrl.validateMemberForm(members)

    // 이미 해당 ID와 이름으로 동아리가 만들어졌는지 검사
    await clubCtrl.checkDuplicatedId(club.clubId)
    await clubCtrl.checkDuplicatedName(club.name)

    // 동아리 회원 중에 유일한 회장이 있는지 검사
    clubCtrl.checkOnlyPresident(members)

    // 동아리를 생성하는 사용자가 동아리 간부인지 검사
    clubCtrl.checkExecutive(user, members)

    // 동아리를 생성하는 사용자가 유일한 동아리 페이지 관리자인지 검사
    clubCtrl.checkManager(user, members)
    clubCtrl.checkOnlyManager(members)

    // 새로운 동아리 생성
    const clubDocId = await clubCtrl.createClub(club)

    // 동아리 회원 추가
    await clubCtrl.addMembers(clubDocId, members)

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
    const user = req.app.locals.user

    // 동아리 정보 양식 유효성 검사
    await clubCtrl.validateClubUpdateForm(form)

    // 동아리 이름을 변경할 경우 중복되지 않는지 검사
    if (form.name) {
      await clubCtrl.checkDuplicatedName(form.name)
    }

    // 동아리 정보 업데이트
    await clubCtrl.updateClub(id, form, user)

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
    const user = req.app.locals.user

    await clubCtrl.removeClub(id, user)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 전체 조회
// GET /api/club/:id/member
clubRouter.get('/:id/member', async (req, res, next) => {
  try {
    const id = req.params.id
    const members = await clubCtrl.getMembers(id)
    res.send(members)
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 추가
// POST /api/club/:id/member
clubRouter.post('/:id/member', authCheck, async (req, res, next) => {
  try {
    const id = req.params.id
    const form = req.body
    const user = req.app.locals.user

    // 동아리 회원 양식 유효성 검사
    await clubCtrl.validateMemberForm(form)

    // 추가할 동아리 회원의 유효성 검사
    await clubCtrl.validateNewMember(id, user, form)

    // 회원을 추가할 동아리의 도큐먼트 ID를 추출
    const clubDocId = await clubCtrl.getClubDocId(id)

    // 동아리 회원 추가
    await clubCtrl.addMembers(clubDocId, form)

    res.status(201).end()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 직책 변경
// PATCH /api/club/:id/member
clubRouter.patch('/:id/member', authCheck, async (req, res, next) => {
  try {
    const id = req.params.id
    const form = req.body
    const user = req.app.locals.user

    // 동아리 회원 양식 유효성 검사
    await clubCtrl.validateMemberUpdateForm(form)

    // 업데이트할 동아리 회원 정보의 유효성 검사
    await clubCtrl.validateMemberUpdate(id, user, form)

    // 해당 동아리의 회원 직책 변경
    await clubCtrl.updateMember(id, form)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 동아리 회원 탈퇴
// DELETE /api/club/:id/member/:email
clubRouter.delete('/:id/member/:email', authCheck, async (req, res, next) => {
  try {
    const { id, email } = req.params
    await clubCtrl.removeMember(id, email)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

export default clubRouter
