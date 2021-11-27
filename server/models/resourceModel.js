import mongoose from 'mongoose';
const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    resource_url: { type: String, required: true },
    resource_category_id: {type: mongoose.Schema.Types.ObjectID, ref: 'ResourceCategory'}
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;