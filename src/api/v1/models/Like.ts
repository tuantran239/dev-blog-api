import { model, Schema, Document, Types } from 'mongoose'

export interface LikeDocument extends Document {
  user: any
  post: any
  createdAt: Date
  updatedAt: Date
}

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
      }
    }
  }
)

const Like = model<LikeDocument>('Like', likeSchema)

export default Like
