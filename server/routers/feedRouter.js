import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Feed from '../models/feedModel.js';
import { isAuth } from '../helpers/utils.js';

const feedRouter = express.Router();

feedRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = req.query.category || '';
    const categoryFilter = category ? { category } : {};
    const feeds = await Feed.find({
      ...categoryFilter
    });
    res.send({ feeds });
  })
);

feedRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Feed.remove({});
    const createdFeeds = await Feed.insertMany(data.feeds);
    res.send({ createdFeeds });
  })
);

feedRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const feed = await Feed.findById(req.params.id);
    if (feed) {
      res.send(feed);
    } else {
      res.status(404).send({ message: 'Feed Not Found' });
    }
  })
);

feedRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const feed = new Feed({
      title: req.body.title,
      description: req.body.description,
      user_id: req.user._id,
      feed_category_id: req.body.feed_category_id,
      tags: req.body.tags,
    });
    const createdFeed = await feed.save();
    res.send({ message: 'Feed Created', feed: createdFeed });
  })
);

feedRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const feedId = req.params.id;
    const feed = await Feed.findById(feedId);
    if (feed) {
      feed.title = req.body.title;
      feed.description = req.body.description;
      const updatedFeed = await feed.save();
      res.send({ message: 'Feed Updated', feed: updatedFeed });
    } else {
      res.status(404).send({ message: 'Feed Not Found' });
    }
  })
);

feedRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const feed = await Feed.findById(req.params.id);
    if (feed) {
      const deleteFeed = await feed.remove();
      res.send({ message: 'Feed Deleted', feed: deleteFeed });
    } else {
      res.status(404).send({ message: 'Feed Not Found' });
    }
  })
);

export default feedRouter;
