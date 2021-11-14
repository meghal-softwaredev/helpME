import mongoose from 'mongoose';

const feedAnswerSchema = new mongoose.Schema(
  {
    feed_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Feed' },
    answer: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    upvotes: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);
const FeedAnswer = mongoose.model('FeedAnswer', feedAnswerSchema);
export default FeedAnswer;