import mongoose from 'mongoose';
const feedCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img_url: { type: String },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  }
);

const FeedCategory = mongoose.model('FeedCategory', feedCategorySchema);
export default FeedCategory;