import { model, Schema, Document, Types } from 'mongoose'

export interface FollowingDocument extends Document {
  user: any
  following: any
  createdAt: Date
  updatedAt: Date
}

const followingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const Following = model<FollowingDocument>('Following', followingSchema)

export default Following
