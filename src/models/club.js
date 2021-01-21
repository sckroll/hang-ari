/**
 * 동아리 스키마
 *
 * @author Sckroll
 */

import { Schema, model, Types } from 'mongoose'

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

    // 동아리 회장
    president: { type: String, required: true },

    // 지도교수
    professor: { type: String },

    // 동아리 로고
    logo: { type: String, required: true },

    // 동아리 배경화면
    background: { type: String },

    // 동아리 회원 리스트
    members: { type: [Types.ObjectId], ref: 'Users', required: true },
  },
  {
    timestamps: true,
  },
)

export default model('Club', ClubSchema)
