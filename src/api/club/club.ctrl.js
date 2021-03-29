/**
 * 동아리(club) 라우트의 비즈니스 로직 처리
 *
 * @author Sckroll
 */

import JoiBase from 'joi'
import joiDate from '@joi/date'
import path from 'path'
import Club from '../../models/club'
import User from '../../models/user'
import Member from '../../models/member'
import {
  InvalidClubError,
  DuplicateError,
  InvalidUserError,
  InvalidMemberError,
  AuthError,
} from '../../lib/errors'

const Joi = JoiBase.extend(joiDate)

/**
 * 동아리 양식의 유효성을 검사하는 함수
 */
export const validateClubForm = async form => {
  const schema = Joi.object().keys({
    clubId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()).required(),
    homepage: Joi.string(),
    room: Joi.string(),
    professor: Joi.string(),
    // logo: Joi.string(),
    // background: Joi.string(),
    establishedAt: Joi.date().format('YYYY-MM-DD'),
  })
  await schema.validateAsync(form)
}

/**
 * 동아리 회원 양식의 유효성을 검사하는 함수
 */
export const validateMemberForm = async form => {
  const schema = Joi.array().items(
    Joi.object()
      .keys({
        studentId: Joi.string().required(),
        position: Joi.string().allow(''),
        isPresident: Joi.boolean(),
        isExecutive: Joi.boolean(),
        isManager: Joi.boolean(),
      })
      .required(),
  )
  await schema.validateAsync(form)
}

/**
 * 업데이트할 동아리 양식의 유효성을 검사하는 함수
 */
export const validateClubUpdateForm = async form => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string().required()),
    homepage: Joi.string().allow(''),
    room: Joi.string().allow(''),
    professor: Joi.string().allow(''),
    logo: Joi.string().allow(''),
    background: Joi.string().allow(''),
    establishedAt: Joi.date().format('YYYY-MM-DD'),
  })
  await schema.validateAsync(form)
}

/**
 * 쿼리에 따라 동아리를 조회하는 함수
 */
export const getClub = async params => {
  const query = {}
  for (const key in params) {
    if (key && params[key].length > 0) {
      query[key] = params[key]
    }
  }

  const clubs = await Club.find(query)

  // 각 동아리의 도큐먼트 ID 제거
  return clubs.map(club => club.serialize())
}

/**
 * 동아리 ID가 중복되는지 검사하는 함수
 */
export const checkDuplicatedId = async clubId => {
  const exists = await Club.exists({ clubId })
  if (exists) {
    throw new DuplicateError('duplicated club id')
  }
}

/**
 * 동아리 이름이 중복되는지 검사하는 함수
 */
export const checkDuplicatedName = async name => {
  const exists = await Club.exists({ name })
  if (exists) {
    throw new DuplicateError('duplicated club name')
  }
}

/**
 * 사용자가 동아리 회장인지 확인하는 함수
 */
export const checkPresident = (studentId, members) => {
  if (members.length === 0) return

  const president = members.find(member => member.studentId === studentId)
  if (!president.isPresident) {
    throw new AuthError('request should be done by a president')
  }
}

/**
 * 동아리 회장이 유일하게 존재하는지 확인하는 함수
 */
export const checkOnlyPresident = members => {
  if (members.length === 0) return

  const president = members.filter(member => member.isPresident)
  if (president.length !== 1) {
    throw new AuthError('club should have only one president')
  }
}

/**
 * 사용자가 동아리 간부인지 확인하는 함수
 */
export const checkExecutive = (studentId, members) => {
  if (members.length === 0) return

  const executive = members.find(member => member.studentId === studentId)
  if (!executive.isExecutive) {
    throw new AuthError('request should be done by a executive')
  }
}

/**
 * 사용자가 동아리 페이지 관리자인지 확인하는 함수
 */
export const checkManager = (studentId, members) => {
  if (members.length === 0) return

  const manager = members.find(member => member.studentId === studentId)
  if (!manager.isManager) {
    throw new AuthError('request should be done by a manager')
  }
}

/**
 * 동아리 페이지 관리자가 유일하게 존재하는지 확인하는 함수
 */
export const checkOnlyManager = members => {
  if (members.length === 0) return

  const manager = members.filter(member => member.isManager)
  if (manager.length !== 1) {
    throw new AuthError('club should have only one manager')
  }
}

/**
 * 새 회원과 학번이 중복되는 기존 회원이 있는지 검사하는 함수
 */
export const checkDuplicatedMember = (currMembers, newMembers) => {
  for (const newMember of newMembers) {
    const duplicates = currMembers.find(
      member => member.studentId === newMember.studentId,
    )
    if (duplicates) {
      throw new DuplicateError('duplicated student id')
    }
  }
}

/**
 * 추가할 동아리 회원의 유효성을 검사하는 함수
 */
export const validateNewMember = async (clubId, studentId, newMembers) => {
  // 기존 동아리 회원 목록 조회
  const currMembers = await getMembers(clubId)

  // 기존 회원 목록과 새 회원 목록을 통합
  const members = currMembers.concat(newMembers)
  members.forEach(member => {
    if (member.user) {
      member.studentId = member.user.studentId
      member.user = undefined
    }
  })

  // 동아리 회원 중에 유일한 회장이 있는지 확인
  checkOnlyPresident(members)

  // 사용자의 동아리 간부 여부 확인
  checkExecutive(studentId, members)

  // 사용자가 유일한 동아리 페이지 관리자인지 확인
  checkManager(studentId, members)
  checkOnlyManager(members)

  // 새 회원과 학번이 중복되는 회원이 있는지 확인
  checkDuplicatedMember(currMembers, newMembers)
}

/**
 * 업데이트할 동아리 회원 정보의 유효성을 검사하는 함수
 */
export const validateMemberUpdate = async (clubId, studentId, payload) => {
  // 기존 동아리 회원 목록 조회
  const currMembers = await getMembers(clubId)
  const beforeUpdate = currMembers.map(member => ({
    studentId: member.user.studentId,
    position: member.position,
    isPresident: member.isPresident,
    isExecutive: member.isExecutive,
    isManager: member.isManager,
  }))

  // 사용자의 동아리 간부 여부 확인
  checkExecutive(studentId, beforeUpdate)

  // 사용자가 유일한 동아리 페이지 관리자인지 확인
  checkManager(studentId, beforeUpdate)
  checkOnlyManager(beforeUpdate)

  // 업데이트할 동아리 회원 정보를 기존 회원 정보와 비교
  const afterUpdate = []
  beforeUpdate.forEach(member => {
    for (const memberToUpdate of payload) {
      if (memberToUpdate.studentId === member.studentId) {
        const updated = { ...member, ...memberToUpdate }
        afterUpdate.push(updated)
        return
      }
    }
    afterUpdate.push(member)
  })

  // 동아리 회장을 양도하는 경우
  // 업데이트 전과 후에도 유일한 회장이 있는지 확인
  checkOnlyPresident(beforeUpdate)
  checkOnlyPresident(afterUpdate)

  // 동아리 페이지 관리자를 양도하는 경우
  // 업데이트 후에도 유일한 동아리 페이지 관리자가 있는지 확인
  checkOnlyManager(afterUpdate)
}

/**
 * 새로운 동아리를 생성 후 회원 추가를 위해 도큐먼트 ID를 반환하는 함수
 */
export const createClub = async (form, images) => {
  let logo, background

  // 동아리 로고 이미지가 없으면 기본 이미지로 설정
  if (images.logo) {
    logo = images.logo[0]
  } else {
    const num = Math.round(Math.random() * 3) + 1
    const defaultImage = `ha_club_logo${num}.png`
    logo = path.join(__dirname, `../../public/images/${defaultImage}`)
  }

  // 동아리 배경 사진 이미지가 없으면 기본 이미지(패턴)로 설정
  if (images.background) {
    background = images.background[0]
  }

  const club = { ...form, logo, background }
  await Club.create(club)
}

/**
 * 동아리 정보를 업데이트하는 함수
 */
export const updateClub = async (clubId, fieldsToUpdate, userDocId) => {
  // 동아리와 사용자의 도큐먼트 ID 추출
  const club = await Club.findOne({ clubId })
  if (!club) {
    throw new InvalidClubError('club not found')
  }
  const clubDocId = club.id

  // 동아리에 소속된 사용자의 도큐먼트 추출
  const member = await Member.findOne({ club: clubDocId, user: userDocId })
  if (!member) {
    throw new InvalidMemberError('member not found')
  }

  // 사용자가 동아리 페이지의 관리자인지 확인
  if (!member.isManager) {
    throw new AuthError('user should be a manager')
  }

  await Club.findByIdAndUpdate(clubDocId, fieldsToUpdate)
}

/**
 * 동아리를 삭제하는 함수
 */
export const removeClub = async (clubId, userDocId) => {
  // 동아리와 사용자의 도큐먼트 ID 추출
  const club = await Club.findOne({ clubId })
  if (!club) {
    throw new InvalidClubError('club not found')
  }
  const clubDocId = club.id

  // 동아리에 소속된 사용자의 도큐먼트 추출
  const member = await Member.findOne({ club: clubDocId, user: userDocId })
  if (!member) {
    throw new InvalidMemberError('member not found')
  }

  // 사용자가 동아리 페이지의 관리자인지 확인
  if (!member.isManager) {
    throw new AuthError('user should be a manager')
  }

  // 동아리를 삭제하기 전에 동아리에 소속된 사용자와의 연결을 해제
  await Member.deleteMany({ club: clubDocId })

  // 동아리 삭제
  await Club.findByIdAndDelete(clubDocId)
}

/**
 * 특정 동아리의 모든 회원을 조회하는 함수
 */
export const getMembers = async clubId => {
  // 동아리의 도큐먼트 ID 추출
  const clubObj = await Club.findOne({ clubId })
  if (!clubObj) {
    throw new InvalidClubError('club not found')
  }
  const club = clubObj.id

  // 동아리 회원 조회 후 populate
  const members = await Member.find({ club })
    .select('-club')
    .populate('user', '-_id -hashedPassword')
  return members.map(member => member.serialize())
}

/**
 * 동아리에 회원을 추가하는 함수
 */
export const addMembers = async (clubId, members) => {
  for (const member of members) {
    // 동아리 도큐먼트 ID 추출
    const club = await Club.findOne({ clubId })
    if (!club) {
      throw new InvalidClubError('club not found')
    }

    // 학번과 일치하는 사용자의 도큐먼트 ID 추출
    const studentId = member.studentId
    const user = await User.findOne({ studentId })
    if (!user) {
      throw new InvalidUserError('user not found')
    }

    // Member 컬렉션에 저장함으로써 동아리에 회원 추가
    const form = {
      club: club.id,
      user: user.id,
      position: member.position,
      isPresident: member.isPresident,
      isExecutive: member.isExecutive,
      isManager: member.isManager,
    }
    await Member.create(form)
  }
}

/**
 * 동아리 회원의 정보를 업데이트하는 함수
 */
export const updateMember = async (clubId, updatedMembers) => {
  // 동아리 도큐먼트 ID 추출
  const clubObj = await Club.findOne({ clubId })
  if (!clubObj) {
    throw new InvalidClubError('club not found')
  }
  const club = clubObj.id

  updatedMembers.forEach(async member => {
    // 동아리 회원 도큐먼트 ID 추출
    const studentId = member.studentId
    const updatedMember = await User.findOne({ studentId })
    if (!updatedMember) {
      throw new InvalidClubError('user not found')
    }
    const user = updatedMember.id

    await Member.findOneAndUpdate({ club, user }, member)
  })
}

/**
 * DB에서 해당 동아리의 회원을 삭제하는 함수
 */
export const removeMember = async (clubId, email) => {
  // 동아리 도큐먼트 ID 추출
  const clubObj = await Club.findOne({ clubId })
  if (!clubObj) {
    throw new InvalidClubError('club not found')
  }
  const club = clubObj.id

  // 동아리 회원 도큐먼트 ID 추출
  const userObj = await User.findOne({ email })
  if (!userObj) {
    throw new InvalidClubError('user not found')
  }
  const user = userObj.id

  // 동아리에 소속된 사용자의 도큐먼트 추출
  const member = await Member.findOne({ club, user })
  if (!member) {
    throw new InvalidMemberError('member not found')
  }

  // 탈퇴하는 회원이 현재 회장, 간부, 관리자인지 확인
  if (member.isPresident) {
    throw new AuthError('president cannot withdraw from the club')
  }
  if (member.isExecutive) {
    throw new AuthError('executive cannot withdraw from the club')
  }
  if (member.isManager) {
    throw new AuthError('manager cannot withdraw from the club')
  }

  await Member.findOneAndRemove({ club, user })
}
