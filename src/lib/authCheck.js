import jwt from 'jsonwebtoken'
import User from '../models/user'
import { AuthError } from './errors'

/**
 * 현재 로그인을 한 상태인지 검증하고,
 * 로그인 후 일정 시간이 지나면 JWT 토큰을 갱신하는 미들웨어
 */
const authCheck = async (req, res, next) => {
  try {
    let token = req.cookies.hangari_token
    if (!token || token === 'undefined') {
      throw new AuthError('unauthorized access')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const now = Math.floor(Date.now() / 1000)

    const maxAge = parseInt(process.env.JWT_MAX_AGE)
    const reSignTime = parseInt(process.env.JWT_RE_SIGN)

    // 로그인 후 3시간(JWT_RE_SIGN)이 지나면 JWT 토큰 재발급
    if (decoded.exp - now < reSignTime) {
      const user = await User.findById(decoded._id)
      token = user.generateToken()

      res.cookie('hangari_token', token, {
        maxAge,
        httpOnly: true,
      })
    }
    next()
  } catch (e) {
    next(e)
  }
}

export default authCheck
