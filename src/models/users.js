import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  // 사용자 이름
  name: { type: String, required: true, unique: true },

  // 사용자 이메일
  email: { type: String, required: true, unique: true },

  // 사용자 비밀번호 (암호화)
  password: { type: String, required: true },

  // 사용자 학번
  studentId: { type: String, required: true },

  // 사용자 학년
  grade: { type: Number, requied: true },

  // 사용자 학부/학과
  department: { type:String, required: true },

  // 사용자 전화번호
  phoneNumber: { type: String },

  // 대표 썸네일 이미지
  thumbnail: { type: String }
}, {
  timestamps: true
})

export default model('Users', UserSchema)