import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema(
  {
    message_text: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    created_at: { type: Date, required: true, default: Date.now }
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;