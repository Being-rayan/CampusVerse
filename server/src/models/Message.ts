import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    roomId: { type: String, required: true, index: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true, trim: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

export const Message = mongoose.models.Message ?? mongoose.model('Message', messageSchema)
