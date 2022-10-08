import { model, Schema, Document, Types } from 'mongoose'

export interface BookmarkDocument extends Document {
  user: any
  post: any
  count: number
  createdAt: Date
  updatedAt: Date
}

const bookmarkSchema = new Schema(
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

const Bookmark = model<BookmarkDocument>('Bookmark', bookmarkSchema)

export default Bookmark
