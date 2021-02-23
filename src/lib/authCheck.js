import jwt from 'jsonwebtoken'
import { AuthError } from './errors'

/**
 * 현재 로그인을 한 상태인지 검증하는 미들웨어
 */
const authCheck = async (req, res, next) => {
  try {
    let token = req.cookies.hangari_token
    if (!token) {
      // 토큰이 없으면 401 에러
      throw new AuthError('unauthorized access')
    }

    // JWT 토큰 유효성 검사
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (e) {
    res.clearCookie('hangari_token')
    next(e)
  }
}

export default authCheck
