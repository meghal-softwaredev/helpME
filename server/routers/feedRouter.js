import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Feed from '../models/feedModel.js';
import FeedAnswer from '../models/feedAnswerModel.js';
import User from '../models/userModel.js';
import { isAuth } from '../helpers/utils.js';

const feedRouter = express.Router();

feedRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = req.query.category || '';
    const sortBy = req.query.sortBy || '';
    const keyword = req.query.keyword || '';

    const categoryFilter = category ? { category } : {};
    const keywordFilter = keyword ? { $or: [{ title: { $regex: keyword, $options: 'i' } }, { tags: { $regex: keyword, $options: 'i' } }] } : {}
    const sortOrder =
      sortBy === 'latest'
        ? { createdAt: -1 }
        : sortBy === 'oldest'
          ? { createdAt: 1 }
            : { _id: -1 };

    const feeds = await Feed.find({
      ...categoryFilter,
      ...keywordFilter
    }).sort(sortOrder);
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
  '/answers/seed',
  expressAsyncHandler(async (req, res) => {
    await FeedAnswer.remove({});
    const createdFeedAnswers = await FeedAnswer.insertMany(data.feedAnswers);
    res.send({ createdFeedAnswers });
  })
);

feedRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const feed = await Feed.findById(req.params.id).populate("user");

    if (feed) {
      res.send(feed);
    } else {
      res.status(404).send({ message: 'Feed Details Not Found' });
    }
  })
);

feedRouter.get(
  '/:id/answers',
  expressAsyncHandler(async (req, res) => {

    const answers = await FeedAnswer.find({ feed: req.params.id }).populate("user");
    if (answers) {
      res.send(answers);
    } else {
      res.status(404).send({ message: 'Feed Answers Not Found' });
    }
  })
);

feedRouter.post(
  '/new',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const feed = new Feed({
      title: req.body.title,
      description: req.body.description,
      user: req.body.user_id,
      category: req.body.category_id,
      tags: req.body.tags,
    });
    const createdFeed = await feed.save();
    res.send({ message: 'Feed Created', feed: createdFeed });
  })
);

feedRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const feedId = req.params.id;
    const feed = await Feed.findById(feedId);
    if (feed) {
      feed.title = req.body.title;
      feed.description = req.body.description;
      feed.user = req.body.user_id;
      feed.category = req.body.category_id;
      feed.tags = req.body.tags;
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
      const deleteFeedAnswers = await FeedAnswer.deleteMany({ feed: req.params.id });
      /* await FeedAnswer.deleteMany({ feed: req.params.id }, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Answers related to this feed are suceessfully deleted!");
        }
      }); */
      res.send({ message: 'Feed Deleted', feed: deleteFeed, answers: deleteFeedAnswers });
    } else {
      res.status(404).send({ message: 'Feed Not Found' });
    }
  })
);

feedRouter.post(
  '/:id/answer/new',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    const answer = new FeedAnswer({
      feed: req.params.id,
      answer: req.body.answer,
      user: req.body.user_id,
      votes_count: 0,
    });
    const createdAnswer = await answer.save();
    const feedId = req.params.id;
    const feed = await Feed.findById(feedId);
    if (feed) {
      feed.answers.push(answer._id);
      const updatedFeed = await feed.save();
    } else {
      res.status(404).send({ message: 'Feed Not Found' });
    }
    res.send({ message: 'Answer Created', answer: createdAnswer });
  })
);

export default feedRouter;
