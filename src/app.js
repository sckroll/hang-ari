/**
 * Hang-ari 서버 설정 및 실행 파일
 *
 * @author Sckroll
 */

import express from 'express'
import path from 'path'
import http from 'http'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import history from 'connect-history-api-fallback'
import handlebars from 'express-handlebars'
import api from './api'

// Express 객체 생성
const app = express()

// .env 파일로부터 환경 변수 추출
dotenv.config()

// 환경변수로부터 서버 포트 설정
const port = process.env.PORT || 3000

// 미들웨어 설정
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('short'))

// 라우트 연결
const router = express.Router()
router.use('/', api.routes())

// HTML5 pushState 기반 라우팅 미들웨어 설정
// (라우트 연결 이후에 설정할 것)
app.use(history())

// 정적 파일을 저장할 디렉토리 설정
app.use(express.static(path.join(__dirname, 'public')))

// 템플릿 엔진 설정
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.use(router.route())

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status ? err.status : 500)
})

// 서버 생성
const server = http.createServer(app)

// 서버 시작
server.listen(port, () => {
  console.log('[Server] Server listening on ' + port)
})

// 서버 에러 이벤트 리스너 추가
server.on('error', err => {
  if (err.syscall !== 'listen') {
    throw err
  }

  // 에러 코드에 따라 메시지 출력 후 프로세스 종료
  switch (err.code) {
    case 'EACCES':
      console.error('[Server] ' + port + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error('[Server] ' + port + ' is already in use')
      process.exit(1)
    default:
      throw err
  }
})

// 프로세스 종료 시 처리
process.on('SIGTERM', () => {
  console.log('[Server] Server is now closing')
  app.close()
})

// Express 서버 객체 종료와 함꼐 데이터베이스 연결 해제
app.on('close', function () {
  console.log('[Server] Disconnecting database')
  // if (database.db) {
  //   database.db.close()
  // }
})
