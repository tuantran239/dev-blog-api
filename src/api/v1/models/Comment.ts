import { model, Schema, Document, Types } from 'mongoose'

export interface CommentDocument extends Document {
  postId: string
  author: string
  comments: [
    {
      user: any
      comment: string
      date: Date
    }
  ]
  count: number
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
      index: true
    },
    author: {
      type: String,
      required: true
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        replies: [
          {
            reply: {
              type: String,
              reuqired: true
            },
            user: {
              type: Schema.Types.ObjectId,
              reuqired: true,
              index: true
            }
          }
        ],
        date: Date
      }
    ],
    count: {
      type: Number
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

const Comment = model<CommentDocument>('Comment', commentSchema)

export default Comment
