import { NotificationType } from '@api/types/notification'
import { model, Schema, Document } from 'mongoose'

export interface NotificationDocument extends Document {
  user: any
  post: any
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    message: { type: String, required: true },
    notificationType: {
      type: String,
      enum: {
        values: [
          NotificationType.LIKE,
          NotificationType.FOLLOW,
          NotificationType.COMMENT,
          NotificationType.NEWPOST
        ],
        message: '{VALUE} is not supported'
      },
      index: true
    },
    seen: {
      type: Boolean,
      default: false
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

const Notification = model<NotificationDocument>('Notification', notificationSchema)

export default Notification
