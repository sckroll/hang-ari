/**
 * API 라우트 통합 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import auth from './auth'
// import club from './club'
// import post from './post'

const router = Router()

router.use('/auth', auth)
// router.use('/club', club)
// router.use('/post', post)

export default router
