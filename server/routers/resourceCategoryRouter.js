import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import { isAuth } from '../helpers/utils.js';
import ResourceCategory from '../models/resourceCategoryModel.js';

const resourceCategoryRouter = express.Router();

resourceCategoryRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await ResourceCategory.remove({});
    const createdResourceCategories = await ResourceCategory.insertMany(data.resourceCategories);
    res.send({ createdResourceCategories });
  })
);

resourceCategoryRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const createdResourceCategory = await ResourceCategory.find({ user_id: req.params.id });
    res.send({ createdResourceCategory });
  })
);

resourceCategoryRouter.post(
  '/new',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resourceCategory = new ResourceCategory({
      title: req.body.title,
      user_id: req.body.user_id,
    });
    const createdResourceCategory = await resourceCategory.save();
    res.send({ message: 'Resource Category Created', resourceCategory: createdResourceCategory });
  })
);

resourceCategoryRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resourceCategory = await ResourceCategory.findById(req.params.id);
    if (resourceCategory) {
      resourceCategory.title = req.body.title;
      resourceCategory.user_id = req.body.user_id;
      const updatedResourceCategory = await resourceCategory.save();
      res.send({ message: 'Resource Category Updated', resourceCategory: updatedResourceCategory });
    } else {
      res.status(404).send({ message: 'Resource  Not Found' });
    }
  })
);

resourceCategoryRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resourceCategory = await ResourceCategory.findById(req.params.id);
    if (resourceCategory) {
      const deleteResourceCategory = await ResourceCategory.remove();
      res.send({ message: 'ResourceCategory Deleted', resourceCategory: deleteResourceCategory });
    } else {
      res.status(404).send({ message: 'ResourceCategory Not Found' });
    }
  })
);

export default resourceCategoryRouter;