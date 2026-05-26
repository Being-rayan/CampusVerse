import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 600 },
    link: { type: String, trim: true, maxlength: 300 },
    tags: [{ type: String, trim: true, lowercase: true, maxlength: 40 }],
  },
  { _id: false },
)

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    college: { type: String, trim: true, maxlength: 140 },
    bio: { type: String, trim: true, maxlength: 500 },
    avatarUrl: { type: String, trim: true, maxlength: 300 },
    github: { type: String, trim: true, maxlength: 300 },
    linkedin: { type: String, trim: true, maxlength: 300 },
    portfolio: { type: String, trim: true, maxlength: 300 },
    goals: [{ type: String, trim: true, lowercase: true, maxlength: 60 }],
    interests: [{ type: String, trim: true, lowercase: true, maxlength: 60 }],
    preferredRoles: [{ type: String, trim: true, lowercase: true, maxlength: 60 }],
    skills: [{ type: String, trim: true, lowercase: true, maxlength: 60, index: true }],
    projects: [projectSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        const id = ret._id
        delete ret.__v
        ret.id = id instanceof mongoose.Types.ObjectId ? id.toString() : String(id)
        delete ret._id
        return ret
      },
    },
  },
)

export type ProfileDocument = InferSchemaType<typeof profileSchema> & {
  _id: mongoose.Types.ObjectId
}

export const Profile = mongoose.models.Profile ?? mongoose.model('Profile', profileSchema)
