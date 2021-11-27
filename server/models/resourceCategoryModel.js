import mongoose from 'mongoose';
const resourceCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

const ResourceCategory = mongoose.model('ResourceCategory', resourceCategorySchema);
export default ResourceCategory;