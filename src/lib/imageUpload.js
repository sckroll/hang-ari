import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

aws.config.loadFromPath(__dirname + '/../config/s3.json')

const s3 = new aws.S3()
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'hang-ari-storage',
    acl: 'public-read',
    key: function (req, file, cb) {
      const extIdx = file.originalname.lastIndexOf('.')
      const ext = file.originalname.substring(extIdx)
      cb(null, 'thumbnail_' + Date.now() + ext)
    },
  }),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
})

/**
 * 폼 데이터를 통해 업로드한 이미지 파일을 서버의 지정된 경로에 저장하는 미들웨어
 */
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       const extIdx = file.originalname.lastIndexOf('.')
//       const ext = file.originalname.substring(extIdx)
//       cb(null, 'thumbnail_' + Date.now() + ext)
//     },
//   }),
//   limits: {
//     fileSize: 3 * 1024 * 1024,
//   },
// })

export default upload
