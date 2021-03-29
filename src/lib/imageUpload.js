import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

aws.config.loadFromPath(__dirname + '/../config/s3.json')

const s3 = new aws.S3()
export const uploadThumbnail = multer({
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
}).single('thumbnail')

export const uploadClubImage = multer({
  storage: multerS3({
    s3,
    bucket: 'hang-ari-storage',
    acl: 'public-read',
    key: function (req, file, cb) {
      const field = file.fieldname
      const extIdx = file.originalname.lastIndexOf('.')
      const ext = file.originalname.substring(extIdx)
      cb(null, field + '_' + Date.now() + ext)
    },
  }),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
}).fields([{ name: 'logo' }, { name: 'background' }])

// export const uploadClubImage = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       const field = file.fieldname
//       const extIdx = file.originalname.lastIndexOf('.')
//       const ext = file.originalname.substring(extIdx)
//       cb(null, field + '_' + Date.now() + ext)
//     },
//   }),
//   limits: {
//     fileSize: 3 * 1024 * 1024,
//   },
// }).fields([{ name: 'logo' }, { name: 'background' }])
