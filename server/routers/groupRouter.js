import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Group from '../models/groupModel.js';
import { isAuth } from '../helpers/utils.js';

const groupRouter = express.Router();

groupRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = req.query.category || '';
    const categoryFilter = category ? { category } : {};
    const groups = await Group.find({
      ...categoryFilter
    });
    res.send({ groups });
  })
);

groupRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Group.remove({});
    const createdGroups = await Group.insertMany(data.groups);
    res.send({ createdGroups });
  })
);

export default groupRouter;