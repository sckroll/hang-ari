/**
 * 사용자 스키마
 *
 * @author Sckroll
 */

import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema(
  {
    // 사용자 이름
    username: { type: String, required: true },

    // 사용자 이메일
    email: { type: String, required: true, unique: true },

    // 사용자 비밀번호 (암호화)
    hashedPassword: { type: String, required: true },

    // 사용자 학번
    studentId: { type: String, required: true, unique: true },

    // 사용자 학년
    grade: { type: Number, requied: true },

    // 사용자 학부/학과
    department: { type: String, required: true },

    // 사용자 전화번호
    phoneNumber: { type: String },

    // 대표 썸네일 이미지
    thumbnail: { type: String },
  },
  {
    timestamps: true,
  },
)

/**
 * 비밀번호 암호화
 */
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10)
  this.hashedPassword = hash
}

/**
 * 비밀번호 검증
 */
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword)
  return result
}

/**
 * Response body에서 ID 및 암호화된 비밀번호 필드 제거
 */
UserSchema.methods.serialize = function () {
  const data = this.toJSON()
  data._id = data.hashedPassword = undefined
  return data
}

/**
 * JWT 토큰 발급
 */
UserSchema.methods.generateToken = function () {
  const body = { ...this }

  const secret = process.env.JWT_SECRET
  const expiresIn = { expiresIn: process.env.JWT_EXPIRE }
  const token = jwt.sign(body, secret, expiresIn)
  return token
}

export default model('User', UserSchema)
