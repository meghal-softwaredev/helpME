import mongoose from 'mongoose';
const feedSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    verified_answer_id: { type: mongoose.Schema.Types.ObjectID, ref: 'FeedAnswer' },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectID, ref: 'Category' },
    tags: [{ type: String, required: true }],
    answers: [{ type: mongoose.Schema.Types.ObjectID, ref: 'FeedAnswer' }]
    /* answers: [{
      answer: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
      upvotes: { type: String, required: true },
      posted_at: { type: Date, default: Date.now, required: true }
    }] */
  },
  {
    timestamps: true,
  }
);

const Feed = mongoose.model('Feed', feedSchema);
export default Feed;