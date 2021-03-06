import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import { isAuth } from '../helpers/utils.js';

function getRandomImageName() {
  const min = 1;
  const max = 7;
  const rand = Math.floor(Math.random() * max) + min;
  console.log("rand:", rand);
  return `profile-avatar-${rand}.webp`;
}

const profileRouter = express.Router();

profileRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Profile.remove({});
    const createdProfile = await Profile.insertMany(data.profile);
    res.send({ createdProfile });
  })
);

profileRouter.post(
  "/preferred_categories/new",
  expressAsyncHandler(async (req, res) => {
    const preferred_categories = req.body.prefferedCategories;
    const photo_url = getRandomImageName();
    const categoryPreferences = new Profile({
      user: req.body.user_id,
      current_category:
        preferred_categories && preferred_categories.length > 0
          ? preferred_categories[0]
          : "",
      preferred_categories: [...preferred_categories],
      photo_url: photo_url ? photo_url : "profile-avatar-1.webp"
    });
    
    const addedCategoryPreferences = await categoryPreferences.save();
    /* const categoryPreferences = {
      user: req.body.user_id,
      current_category:
        preferred_categories && preferred_categories.length > 0
          ? preferred_categories[0]
          : "",
      preferred_categories: [...preferred_categories],
    };
    const addedCategoryPreferences = await Profile.insertOne(categoryPreferences); */
    res.send({
      message: "Category Preferences Added",
      preferred_categories: addedCategoryPreferences,
    });
  })
);

profileRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const profileDetails = await Profile.findOne({ user: req.params.id }).populate("user");
    if (profileDetails) {
      res.send(profileDetails);
    } else {
      res.status(404).send({ message: 'Profile Details Not Found' });
    }
  })
);

profileRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const profileId = req.params.id;
    const currentEditSection = req.body.currentEditSection;

    const user = await User.findById(req.body.user._id);
    if (currentEditSection === "basic_info") {
      if (user) {
        user.name = req.body.user.name;
        user.email = req.body.user.email;
        const updatedUser = await user.save();
        /* return res.send({ message: 'Profile User Info Updated', user: updatedUser }); */
      } /* else {
        return res.status(404).send({ message: 'Profile User Not Found' });
      } */
    }
    const profile = await Profile.findById(profileId);

    if (profile) {
      if (currentEditSection === "bio_details") {
        profile.bio = req.body.bio;
      }
      if (currentEditSection === "profile_links") {
        profile.github_url = req.body.github_url;
        profile.linkedin_url = req.body.linkedin_url;
        profile.facebook_url = req.body.facebook_url;
        profile.instagram_url = req.body.instagram_url;
        profile.twitter_url = req.body.twitter_url;
      }
      if (currentEditSection === "skills") {
        profile.skills = req.body.skills;
      }
      if (currentEditSection === "volunteer_status") {
        profile.volunteer = req.body.volunteer;
      }
      const updatedProfile = await profile.save();
      res.send({ message: 'Profile Updated', updatedProfile : {...updatedProfile._doc, user: user}, user });
    } else {
      res.status(404).send({ message: 'Profile Not Found' });
    }
  })
);

profileRouter.put(
  '/current_category/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    const profile = await Profile.findOne({ user: userId });
    if (profile) {
      profile.current_category = req.body.updated_current_category;
      const updatedProfile = await profile.save();
      res.send({ message: 'Profile Current Category Updated', updatedProfile: { ...updatedProfile._doc, user: user }, user });
    } else {
      res.status(404).send({ message: 'Profile Not Found' });
    }
  })
);

export default profileRouter;
