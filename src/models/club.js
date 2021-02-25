/**
 * 동아리 스키마
 *
 * @author Sckroll
 */

import { Schema, model } from 'mongoose'

const ClubSchema = new Schema(
  {
    // 동아리 이름
    name: { type: String, required: true, unique: true },

    // 동아리 설명
    description: { type: String, required: true },

    // 카테고리
    category: { type: String, required: true },

    // 동아리 태그
    tags: { type: [String], required: true },

    // 동아리 홈페이지
    homepage: { type: String },

    // 동아리 방(동방) 위치
    room: { type: String },

    // 지도교수
    professor: { type: String },

    // 동아리 로고
    logo: { type: String },

    // 동아리 배경화면
    background: { type: String },

    // 설립일자
    establishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

/**
 * Response body에서 ID 필드 제거
 */
ClubSchema.methods.serialize = function () {
  const data = this.toJSON()
  data._id = undefined
  return data
}

export default model('Club', ClubSchema)
