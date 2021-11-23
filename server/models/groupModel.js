import mongoose from 'mongoose';
const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    group_url: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Category' },
    followers: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
    tags: [{ type: String, required: true }],
    favourites: {type: mongoose.Schema.Types.ObjectID}
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model('Group', groupSchema);
export default Group;