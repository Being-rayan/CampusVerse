import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
      index: true,
    },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        const id = ret._id
        delete ret.passwordHash
        delete ret.__v
        ret.id = id instanceof mongoose.Types.ObjectId ? id.toString() : String(id)
        delete ret._id
        return ret
      },
    },
  },
)

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId
}

export const User = mongoose.models.User ?? mongoose.model('User', userSchema)
