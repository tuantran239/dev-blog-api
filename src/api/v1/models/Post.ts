import { model, Schema, Document } from 'mongoose'

export interface PostDocument extends Document {
  title: string
  body: string
  author: any
  url: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      text: true
    },
    body: {
      type: String,
      required: true
    },
    mainImage: {
      url: {
        type: String,
        default: ''
      },
      public_id: String
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    url: {
      type: String,
      required: true
    },
    tags: { type: [String], index: true },
    likes: {
      type: Number,
      default: 0
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

const Post = model<PostDocument>('Post', postSchema)

export default Post
