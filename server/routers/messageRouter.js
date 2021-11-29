import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import { isAuth } from '../helpers/utils.js';

const messageRouter = express.Router();

messageRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const messages = await Message.find({});
    res.send({ messages });
  })
);

messageRouter.post(
  '/new',
  expressAsyncHandler(async (req, res) => {
    console.log("body", req.body);
    const message = new Message({
      message_text: req.body.message_text,
      user_id: req.body.user_id
    });
    const createdMessage = await message.save();
    res.send({ messageInfo: 'Message Created', message: createdMessage });
  })
);

export default messageRouter;
