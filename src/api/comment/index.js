/**
 * 포스트 댓글 (comment) 라우트 설정 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import * as commentCtrl from './comment.ctrl'
import authCheck from '../../lib/authCheck'

const commentRouter = new Router()

// 쿼리에 따른 댓글 리스트 조회
// (포스트 ID, 참조 댓글 ID, 작성자 이메일, 작성자 학번)
// GET /api/comment{?postId,refCommentId,email,studentId}
commentRouter.get('/', async (req, res, next) => {
  try {
    const query = req.query
    const comments = await commentCtrl.getComment(query)
    res.send(comments)
  } catch (e) {
    next(e)
  }
})

// 댓글 생성
// POST /api/comment
commentRouter.post('/', authCheck, async (req, res, next) => {
  try {
    const form = req.body
    const { _id: userDocId } = req.app.locals.user

    // 댓글 양식 유효성 검사
    await commentCtrl.validateCommentForm(form)

    // 새로운 댓글 생성
    await commentCtrl.createComment(userDocId, form)

    res.status(201).end()
  } catch (e) {
    next(e)
  }
})

// 댓글 수정
// PATCH /api/comment/:id
commentRouter.patch('/:id', authCheck, async (req, res, next) => {
  try {
    const { id: commentId } = req.params
    const content = req.body.content
    const { _id: userDocId } = req.app.locals.user

    // 업데이트할 댓글 내용의 유효성 검사
    await commentCtrl.validateCommentContent(content)

    // 포스트 업데이트
    await commentCtrl.updateComment(commentId, userDocId, content)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 댓글 삭제 (기존 메시지를 삭제 메시지로 대체, DB에는 그대로 보존됨)
// PATCH /api/comment/:id/remove
commentRouter.patch('/:id/remove', authCheck, async (req, res, next) => {
  try {
    const { id } = req.params
    await commentCtrl.removeComment(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 댓글 삭제 (DB에서 완전 삭제)
// DELETE /api/comment/:id
commentRouter.delete('/:id', authCheck, async (req, res, next) => {
  try {
    const { id } = req.params
    await commentCtrl.deleteComment(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

export default commentRouter
