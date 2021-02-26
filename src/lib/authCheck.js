import { AuthError } from './errors'

/**
 * 현재 로그인을 한 상태인지 검증하는 미들웨어
 */
const authCheck = async (req, res, next) => {
  try {
    const user = req.app.locals.user
    if (!user) {
      // 전역 객체에 사용자 정보가 없으면 401 에러
      throw new AuthError('unauthorized access')
    }
    next()
  } catch (e) {
    next(e)
  }
}

export default authCheck
