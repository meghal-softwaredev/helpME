import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import FeedAnswer from '../models/feedAnswerModel.js';
import User from '../models/userModel.js';
import { isAuth } from '../helpers/utils.js';

const answerRouter = express.Router();

answerRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const feedAnswer = await FeedAnswer.findById(req.params.id);
    if (feedAnswer) {
      const deleteFeedAnswer = await feedAnswer.remove();
      res.send({ message: 'Feed Answer Deleted', answer: deleteFeedAnswer });
    } else {
      res.status(404).send({ message: 'Feed Answer Not Found' });
    }
  })
);

answerRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const feedAnswerId = req.params.id;
    const feedAnswer = await FeedAnswer.findById(feedAnswerId);
    if (feedAnswer) {
      feedAnswer.answer = req.body.answer;
      const updatedFeedAnswer = await feedAnswer.save();
      res.send({ message: 'Feed Updated', feedAnswer: updatedFeedAnswer });
    } else {
      res.status(404).send({ message: 'Feed Not Found' });
    }
  })
);

export default answerRouter;