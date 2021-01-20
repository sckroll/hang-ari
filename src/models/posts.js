import { Schema, Types, model } from 'mongoose'

const PostSchema = new Schema(
  {
    // 게시글 카테고리
    category: { type: String, required: true },

    // 게시글 제목
    title: { type: String, required: true },

    // 게시글 내용
    content: { type: String, required: true },

    // 게시글 작성자
    author: { type: Types.ObjectId, ref: 'Users', required: true },

    // 게시글 관련 동아리
    relatedClub: { type: Types.ObjectId, ref: 'Clubs' },
  },
  {
    timestamps: true,
  },
)

export default model('Posts', PostSchema)
