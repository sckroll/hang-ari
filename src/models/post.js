/**
 * 포스트 스키마
 *
 * @author Sckroll
 */

import mongoose, { Schema, model } from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const PostSchema = new Schema(
  {
    // 포스트 ID
    postId: { type: String, required: true, unique: true },

    // 포스트 카테고리
    category: { type: String, required: true },

    // 포스트 제목
    title: { type: String, required: true },

    // 포스트 내용
    content: { type: String, required: true },

    // 포스트 작성자
    author: { type: ObjectId, ref: 'User', required: true },

    // 포스트 관련 동아리
    club: { type: ObjectId, ref: 'Club' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

/**
 * Response body에서 ID 필드 제거
 */
PostSchema.methods.serialize = function () {
  const data = this.toJSON()
  data._id = undefined
  return data
}

export default model('Post', PostSchema)
