import crypto from 'crypto'

/**
 * 해시 문자열 ID를 생성하는 함수
 * (base64url 형식의 8자리 문자열)
 */
const hashedIdGenerator = () => {
  const randomStr = crypto.randomBytes(256).toString('base64').substr(100, 8)
  const base64url = randomStr.replace(/\+/gi, '-').replace(/\//gi, '_')
  return base64url
}

export default hashedIdGenerator
