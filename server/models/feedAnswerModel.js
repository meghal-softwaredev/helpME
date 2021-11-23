import mongoose from 'mongoose';

const feedAnswerSchema = new mongoose.Schema(
  {
    feed: { type: mongoose.Schema.Types.ObjectID, ref: 'Feed' },
    answer: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    votes_count: { type: String, default: 0, required: true },
    up_votes: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
    down_votes: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);
const FeedAnswer = mongoose.model('FeedAnswer', feedAnswerSchema);
export default FeedAnswer;