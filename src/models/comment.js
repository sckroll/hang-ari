/**
 * 포스트 댓글 스키마
 *
 * @author Sckroll
 */

import mongoose, { Schema, model } from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const CommentSchema = new Schema(
  {
    // 댓글 ID
    commentId: { type: String, required: true, unique: true },

    // 참조 댓글 ID
    refCommentId: { type: String },

    // 포스트 ID
    postId: { type: String, required: true },

    // 댓글 내용
    content: { type: String, required: true },

    // 댓글 작성자
    author: { type: ObjectId, ref: 'User', required: true },

    // 삭제 여부
    isRemoved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

/**
 * Response body에서 ID 필드 제거
 */
CommentSchema.methods.serialize = function () {
  const data = this.toJSON()
  data._id = undefined
  return data
}

export default model('Comment', CommentSchema)
