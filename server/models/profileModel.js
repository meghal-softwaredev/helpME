import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    photo_url: { type: String },
    bio: { type: String },
    github_url: { type: String },
    linkedin_url: { type: String },
    facebook_url: { type: String },
    instagram_url: { type: String },
    twitter_url: { type: String },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    current_category: { type: mongoose.Schema.Types.ObjectID, ref: "Category" },
    preferred_categories: [
      { type: mongoose.Schema.Types.ObjectID, ref: "Category" },
    ],
    skills: [{ type: String }],
    volunteer: { type: Boolean, default: false, required: true },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
