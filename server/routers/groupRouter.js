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
    const sortBy = req.query.sortBy || '';
    const keyword = req.query.keyword || '';

    const categoryFilter = category ? { category } : {};

    const keywordFilter = keyword ? { $or: [{ title: { $regex: keyword, $options: 'i' } }, { tags: { $regex: keyword, $options: 'i' } }] } : {}

    const sortOrder = sortBy === 'latest' ? { createdAt: -1 } : sortBy === 'oldest'
          ? { createdAt: 1 } : { _id: -1 };

    const groups = await Group.find({
      ...categoryFilter,
      ...keywordFilter
    }).sort(sortOrder);
    
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

groupRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (group) {
      res.send(group);
    } else {
      res.status(404).send({ message: 'Group Not Found' });
    }
  })
);

groupRouter.post(
  '/new',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const group = new Group({
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      group_url: req.body.group_url,
      category_id: req.body.category_id,
      tags: req.body.tags
    });
    const createdGroup = await group.save();
    res.send({ message: 'Group Created', group: createdGroup });
  })
);

groupRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const groupId = req.params.id;

    const group = await Group.findById(groupId);
    if (group) {
      group.title = req.body.title;
      group.description = req.body.description;
      group.user_id = req.body.user_id;
      group.group_url = req.body.group_url; 
      group.category_id = req.body.category_id;
      group.tags = req.body.tags;
      const updatedGroup = await group.save();
      res.send({ message: 'Group Updated', group: updatedGroup });
    } else {
      res.status(404).send({ message: 'Group  Not Found' });
    }
  })
);

groupRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (group) {
      const deleteGroup = await group.remove();
      res.send({ message: 'Group Deleted', group: deleteGroup });
    } else {
      res.status(404).send({ message: 'Group Not Found' });
    }
  })
);

groupRouter.put(
  '/:id/join',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    if (group) {
      group.followers.push(req.body.user_id);
      const updatedGroup = await group.save();
      res.send({ message: 'Group Updated', group: updatedGroup });
    } else {
      res.status(404).send({ message: 'Group  Not Found' });
    }
  })
);

groupRouter.put(
  '/:id/addFavourite',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    if (group) {
      group.group_favourites = req.body.favourites;
      const updatedGroup = await group.save();
      res.send({ message: 'Group Updated', group: updatedGroup });
    } else {
      res.status(404).send({ message: 'Group  Not Found' });
    }
  })
);

groupRouter.put(
  '/:id/deleteFavourite',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    if (group) {
      group.group_favourites = req.body.favourites;
      const updatedGroup = await group.save();
      res.send({ message: 'Group Updated', group: updatedGroup });
    } else {
      res.status(404).send({ message: 'Group  Not Found' });
    }
  })
);

export default groupRouter;