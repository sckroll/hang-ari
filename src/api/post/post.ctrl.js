/**
 * 포스트(post) 라우트의 비즈니스 로직 처리
 *
 * @author Sckroll
 */

import Joi from 'joi'
import crypto from 'crypto'
import Club from '../../models/club'
import User from '../../models/user'
import Post from '../../models/post'
import { InvalidClubError, InvalidUserError } from '../../lib/errors'

/**
 * 포스트 양식의 유효성을 검사하는 함수
 */
export const validatePostForm = async form => {
  const schema = Joi.object().keys({
    category: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  })
  await schema.validateAsync(form)
}

/**
 * 쿼리에 따라 포스트를 조회하는 함수
 */
export const getPost = async params => {
  const query = {}
  for (const key in params) {
    if (key && params[key].length > 0) {
      if (key === 'email') {
        const user = User.findOne({ email: params[key] })
        if (!user) {
          throw new InvalidUserError('user not found')
        }
        query[key] = user.id
      } else if (key === 'userName') {
        const user = User.findOne({ name: params[key] })
        if (!user) {
          throw new InvalidUserError('user not found')
        }
        query[key] = user.id
      } else if (key === 'clubName') {
        const club = Club.findOne({ name: params[key] })
        if (!club) {
          throw new InvalidClubError('club not found')
        }
        query[key] = club.id
      } else {
        query[key] = params[key]
      }
    }
  }

  // 포스트를 조회하면서 populate
  const posts = await Post.find(query)
    .populate('author', '-_id -hashedPassword')
    .populate('club', '-_id')

  // 각 포스트의 도큐먼트 ID 제거
  return posts.map(post => post.serialize())
}

export const createPost = async (form, name, clubId) => {
  // 사용자 ID 추출
  const user = await User.findOne({ name })
  if (!user) {
    throw new InvalidUserError('user not found')
  }

  // 동아리 ID 추출 (동아리 ID를 파라미터로 받았을 때만)
  let club
  if (clubId) {
    club = await Club.findOne({ clubId })
    if (!club) {
      throw new InvalidClubError('club not found')
    }
  }

  // 포스트 ID 생성 (base64url)
  let postId
  while (true) {
    const randomByte = crypto.randomBytes(256).toString('base64').substr(100, 8)
    postId = randomByte.replace(/\+/gi, '-').replace(/\//gi, '_')

    // 중복 확인
    const exists = await Post.exists({ postId })
    if (!exists) break
  }

  const newPost = {
    ...form,
    postId,
    author: user.id,
  }
  if (clubId) newPost.club = club.id
  await Post.create(newPost)
}