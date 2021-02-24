/**
 * 동아리 회원 스키마
 *
 * @author Sckroll
 */

import { Schema, model, Types } from 'mongoose'

const MemberSchema = new Schema(
  {
    // 동아리 도큐먼트 ID
    club: { type: Types.ObjectId, ref: 'Clubs', required: true },

    // 사용자 도큐먼트 ID
    user: { type: Types.ObjectId, ref: 'Users', required: true },

    // 동아리 직책
    position: { type: String },
  },
  {
    timestamps: true,
  },
)

/**
 * 두 개의 유일 키(unique key)를 가지도록 인덱스 설정
 */
MemberSchema.index({ club: 1, user: 1 }, { unique: true })

/**
 * Response body에서 ID 필드 제거
 */
MemberSchema.methods.serialize = function () {
  const data = this.toJSON()
  data._id = undefined
  return data
}

export default model('Members', MemberSchema)
