import { model, Schema, Document, Types } from 'mongoose'

export interface FollowerDocument extends Document {
  user: any
  follower: any
  createdAt: Date
  updatedAt: Date
}

const followerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    follower: {
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

const Follower = model<FollowerDocument>('Follower', followerSchema)

export default Follower
