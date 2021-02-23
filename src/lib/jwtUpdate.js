import jwt from 'jsonwebtoken'
import User from '../models/user'

/**
 * 로그인한 상태에서 일정 시간이 지나면 JWT 토큰을 갱신하는 미들웨어
 */
const jwtUpdate = async (req, res, next) => {
  try {
    let token = req.cookies.hangari_token
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const now = Math.floor(Date.now() / 1000)
      const maxAge = parseInt(process.env.JWT_MAX_AGE)
      const updateTime = parseInt(process.env.JWT_UPDATE_TIME)

      // 로그인 후 3시간(JWT_RE_SIGN)이 지나면 JWT 토큰 재발급
      if (decoded.exp - now < updateTime) {
        const user = await User.findById(decoded._id)
        token = user.generateToken()

        res.cookie('hangari_token', token, {
          maxAge,
          httpOnly: true,
        })
      }
    }
    next()
  } catch (e) {
    res.clearCookie('hangari_token')
    next(e)
  }
}

export default jwtUpdate
