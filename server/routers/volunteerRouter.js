import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import { isAuth } from '../helpers/utils.js';

const volunteerRouter = express.Router();

volunteerRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const volunteers = await Profile.find({ volunteer: true }).populate("user");
    console.log("volunteers", volunteers);
    if (volunteers) {
      res.send(volunteers);
    } else {
      res.status(404).send({ message: 'Volunteers Not Found' });
    }
  })
);

export default volunteerRouter;
