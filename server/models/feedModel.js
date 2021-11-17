import mongoose from 'mongoose';
const feedSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    verified_answer_id: { type: mongoose.Schema.Types.ObjectID, ref: 'FeedAnswer' },
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    category_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Category' },
    tags: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const Feed = mongoose.model('Feed', feedSchema);
export default Feed;