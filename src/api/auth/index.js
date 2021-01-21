/**
 * 사용자(user) 라우트 설정 파일
 *
 * @author Sckroll
 */

import { Router } from 'express'
import * as authCtrl from './auth.ctrl'

const authRouter = Router()

authRouter.get('/', authCtrl.getUser)

export default authRouter
