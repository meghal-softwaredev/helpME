import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import FeedCategory from '../models/feedCategoryModel.js';

const feedCategoryRouter = express.Router();

feedCategoryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const feedCategories = await FeedCategory.find({});
    res.send({ feedCategories });
  })
);

feedCategoryRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await FeedCategory.remove({});
    const createdFeedCategories = await FeedCategory.insertMany(data.feedCategories);
    res.send({ createdFeedCategories });
  })
);

feedCategoryRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const feedCategory = new FeedCategory({
      name: req.body.name
    });
    const createdFeedCategory = await feedCategory.save();
    res.send({ message: 'Feed Category Created', feedCategory: createdFeedCategory });
  })
);

export default feedCategoryRouter;
