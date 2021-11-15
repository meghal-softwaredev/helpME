import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Category from '../models/categoryModel.js';

const categoryRouter = express.Router();

categoryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send({ categories });
  })
);

categoryRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Category.remove({});
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
  })
);

categoryRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      name: req.body.name
    });
    const createdCategory = await category.save();
    res.send({ message: 'Category Created', category: createdCategory });
  })
);

export default categoryRouter;
