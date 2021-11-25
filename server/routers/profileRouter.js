import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

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
    const categoryPreferences = new Profile({
      user: req.body.user_id,
      current_category:
        preferred_categories && preferred_categories.length > 0
          ? preferred_categories[0]
          : "",
      preferred_categories: [...preferred_categories],
    });
    const addedCategoryPreferences = await categoryPreferences.save();
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

export default profileRouter;
