import { AuthType, Role } from '@api/types'
import { model, Schema, Document } from 'mongoose'
import { hash, compare } from 'bcrypt'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  skills: string[]
  bio: string
  followers: number
  followings: number
  authType: AuthType
  role: string
  avatar: {
    url: string
    public_id: string | null
  }
  token: string | null
  active: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword: (password: string) => boolean
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    skills: [String],
    bio: String,
    followers: {
      type: Number,
      default: 0
    },
    followings: {
      type: Number,
      default: 0
    },
    authType: {
      type: String,
      enum: {
        values: [AuthType.EMAIL, AuthType.GOOGLE],
        message: '{VALUE} is not supported'
      },
      default: AuthType.EMAIL
    },
    role: {
      type: String,
      enum: {
        values: [Role.USER, Role.ADMIN],
        message: '{VALUE} is not supported'
      },
      default: Role.USER
    },
    avatar: {
      url: String,
      public_id: String
    },
    active: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: null
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

userSchema.methods.comparePassword = async function (password: string) {
  const user = this
  return await compare(password, user.password)
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8)
  }
  next()
})

const User = model<UserDocument>('User', userSchema)

export default User
