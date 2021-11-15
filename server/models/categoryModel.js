import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema(
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

const Category = mongoose.model('FeedCategory', categorySchema);
export default Category;