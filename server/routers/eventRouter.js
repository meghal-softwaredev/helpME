import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Event from '../models/eventModel.js';
import { isAuth } from '../helpers/utils.js';

const eventRouter = express.Router();

eventRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const group = req.query.group || '';
    const groupFilter = group ? { group } : {};
    const events = await Event.find({
      ...groupFilter
    });
    res.send({ events });
  })
);

eventRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Event.remove({});
    const createdEvents = await Event.insertMany(data.events);
    res.send({ createdEvents });
  })
);

eventRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.send(event);
    } else {
      res.status(404).send({ message: 'Event Not Found' });
    }
  })
);

eventRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      user_id: req.user._id,
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      event_url: req.body.event_url,
      group_id: req.body.group_id,
      tags: req.body.tags
    });
    const createdEvent = await Event.save();
    res.send({ message: 'Event Created', event: createdEvent });
  })
);

eventRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await Feed.findById(eventId);
    if (event) {
      event.title = req.body.title;
      event.description = req.body.description;
      const updatedEvent = await event.save();
      res.send({ message: 'Event Updated', event: updatedEvent });
    } else {
      res.status(404).send({ message: 'Event Not Found' });
    }
  })
);

eventRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      const deleteEvent = await event.remove();
      res.send({ message: 'Event Deleted', event: deleteEvent });
    } else {
      res.status(404).send({ message: 'Event Not Found' });
    }
  })
);

export default eventRouter;
