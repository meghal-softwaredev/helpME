import mongoose from 'mongoose';

const feedAnswerSchema = new mongoose.Schema(
  {
    feed: { type: mongoose.Schema.Types.ObjectID, ref: 'Feed' },
    answer: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    upvotes: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);
const FeedAnswer = mongoose.model('FeedAnswer', feedAnswerSchema);
export default FeedAnswer;