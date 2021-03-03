/**
 * 포스트 (post) 라우트 설정 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import * as postCtrl from './post.ctrl'
import authCheck from '../../lib/authCheck'

const postRouter = new Router()

// 쿼리에 따른 포스트 리스트 조회
// (포스트 ID, 카테고리, 제목, 작성자 이메일, 작성자 이름, 동아리 이름)
// GET /api/post{?postId,category,title,email,userName,clubName}
postRouter.get('/', async (req, res, next) => {
  try {
    const query = req.query
    const posts = await postCtrl.getPost(query)
    res.send(posts)
  } catch (e) {
    next(e)
  }
})

// 포스트 생성
// POST /api/post
postRouter.post('/', authCheck, async (req, res, next) => {
  try {
    const { clubId, form } = req.body
    const { email } = req.app.locals.user

    // 포스트 양식 유효성 검사
    await postCtrl.validatePostForm(form)

    // 새로운 포스트 생성
    await postCtrl.createPost(form, email, clubId)

    res.status(201).end()
  } catch (e) {
    next(e)
  }
})

// 포스트 수정
// PATCH /api/post/:id
postRouter.patch('/:id', authCheck, async (req, res, next) => {
  try {
    const { id } = req.params
    const form = req.body

    // 업데이트할 포스트 양식 유효성 검사
    await postCtrl.validatePostUpdateForm(form)

    // 포스트 업데이트
    await postCtrl.updatePost(id, form)

    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

// 포스트 삭제
// DELETE /api/post/:id
postRouter.delete('/:id', authCheck, async (req, res, next) => {
  try {
    const { id } = req.params
    await postCtrl.removePost(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

export default postRouter
