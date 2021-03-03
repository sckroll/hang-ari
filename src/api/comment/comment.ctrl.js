/**
 * 포스트 댓글(comment) 라우트의 비즈니스 로직 처리
 *
 * @author Sckroll
 */

import Joi from 'joi'
import crypto from 'crypto'
import User from '../../models/user'
import Comment from '../../models/comment'
import {
  InvalidUserError,
  InvalidCommentError,
  AuthError,
} from '../../lib/errors'

/**
 * 댓글 양식의 유효성을 검사하는 함수
 */
export const validateCommentForm = async form => {
  const schema = Joi.object().keys({
    postId: Joi.string().required(),
    refCommentId: Joi.string(),
    content: Joi.string().required(),
  })
  await schema.validateAsync(form)
}

/**
 * 업데이트할 댓글 내용의 유효성을 검사하는 함수
 */
export const validateCommentContent = async content => {
  const schema = Joi.string()
  await schema.validateAsync(content)
}

/**
 * 쿼리에 따라 댓글을 조회하는 함수
 */
export const getComment = async params => {
  const query = {}
  for (const key in params) {
    if (key && params[key].length > 0) {
      if (key === 'email') {
        const user = User.findOne({ email: params[key] })
        if (!user) {
          throw new InvalidUserError('user not found')
        }
        query[key] = user.id
      } else if (key === 'studentId') {
        const user = User.findOne({ studentId: params[key] })
        if (!user) {
          throw new InvalidUserError('user not found')
        }
        query[key] = user.id
      } else {
        query[key] = params[key]
      }
    }
  }

  // 댓글을 조회하면서 populate
  const comments = await Comment.find(query).populate(
    'author',
    '-_id -hashedPassword',
  )

  // 각 댓글의 도큐먼트 ID 제거
  return comments.map(comment => comment.serialize())
}

/**
 * 댓글을 생성하는 함수
 */
export const createComment = async (
  userDocId,
  { postId, refCommentId, content },
) => {
  // 댓글 ID 생성 (base64url)
  let commentId
  while (true) {
    const randomByte = crypto.randomBytes(256).toString('base64').substr(100, 8)
    commentId = randomByte.replace(/\+/gi, '-').replace(/\//gi, '_')

    // 중복 확인
    const exists = await Comment.exists({ commentId })
    if (!exists) break
  }

  const newComment = {
    commentId,
    refCommentId,
    postId,
    content,
    author: userDocId,
  }
  await Comment.create(newComment)
}

/**
 * 댓글을 수정하는 함수
 */
export const updateComment = async (commentId, userDocId, content) => {
  // 본인의 댓글인지 검사
  const currComment = await Comment.findOne({ commentId })
  if (!currComment) {
    throw new InvalidCommentError('comment not found')
  }
  if (currComment.author.toString() !== userDocId) {
    throw new AuthError('comment can only update by the author')
  }

  await Comment.findOneAndUpdate({ commentId }, { content })
}

/**
 * 댓글을 삭제하는 함수
 * (실제로 삭제하진 않고 댓글 내용을 삭제 메시지로 대체)
 */
export const removeComment = async commentId => {
  const removed = await Comment.findOneAndUpdate(
    { commentId },
    { isRemoved: true },
  )

  // 유효하지 않은 댓글 ID로 요청했다면 예외 처리
  if (!removed) {
    throw new InvalidCommentError('comment not found')
  }
}

/**
 * 댓글을 삭제하는 함수 (DB에서 완전 삭제)
 */
export const deleteComment = async commentId => {
  const removed = await Comment.findOneAndRemove({ commentId })

  // 유효하지 않은 댓글 ID로 요청했다면 예외 처리
  if (!removed) {
    throw new InvalidCommentError('comment not found')
  }
}
