import mongoose, { Schema } from 'mongoose'

const opportunitySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['hackathon', 'research', 'startup', 'freelance', 'open-source', 'internship'],
      required: true,
      index: true,
    },
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true, index: true }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['draft', 'open', 'closed', 'verified'],
      default: 'open',
      index: true,
    },
  },
  { timestamps: true },
)

export const Opportunity =
  mongoose.models.Opportunity ?? mongoose.model('Opportunity', opportunitySchema)
