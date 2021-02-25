/**
 * 동아리(club) 라우트의 비즈니스 로직 처리
 *
 * @author Sckroll
 */

import JoiBase from 'joi'
import joiDate from '@joi/date'
import Club from '../../models/club'
import User from '../../models/user'
import Member from '../../models/member'
import {
  InvalidClubError,
  DuplicateError,
  InvalidUserError,
} from '../../lib/errors'

const Joi = JoiBase.extend(joiDate)

/**
 * 동아리 양식의 유효성을 검사하는 함수
 */
export const validateClubForm = async form => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()).required(),
    homepage: Joi.string(),
    room: Joi.string(),
    professor: Joi.string(),
    logo: Joi.string(),
    background: Joi.string(),
    establishedAt: Joi.date().format('YYYY-MM-DD').utc(),
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
        position: Joi.string(),
      })
      .required(),
  )
  await schema.validateAsync(form)
}

/**
 * 모든 동아리의 정보를 조회하는 함수
 */
export const getClubs = async () => {
  const clubs = await Club.find()

  // 각 동아리의 도큐먼트 ID 제거
  return clubs.map(club => club.serialize())
}

/**
 * 특정 동아리의 정보를 조회하는 함수
 */
export const getClub = async name => {
  const club = await Club.findOne({ name })
  if (!club) {
    throw new InvalidClubError('club not found')
  }

  // 동아리의 도큐먼트 ID 제거
  return club.serialize()
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
 * 새로운 동아리를 생성 후 회원 추가를 위해 도큐먼트 ID를 반환하는 함수
 */
export const createClub = async form => {
  const club = new Club(form)
  await club.save()
  return club.id
}

/**
 * 동아리에 회원을 추가하는 함수
 */
export const addMember = async (clubId, members) => {
  for (const member of members) {
    // 학번과 일치하는 사용자의 도큐먼트 ID 추출
    const studentId = member.studentId
    const user = await User.findOne({ studentId })
    if (!user) {
      throw new InvalidUserError('user not found')
    }

    // Member 컬렉션에 저장함으로써 동아리에 회원 추가
    const form = {
      club: clubId,
      user: user.id,
      position: member.position,
    }
    const newMember = new Member(form)
    await newMember.save()
  }
}
