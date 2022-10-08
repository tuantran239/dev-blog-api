import { model, Schema, Document, Types } from 'mongoose'

export interface TagDocument extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true
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

const Tag = model<TagDocument>('Tag', tagSchema)

export default Tag
