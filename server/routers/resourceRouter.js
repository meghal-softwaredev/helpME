import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import { isAuth } from '../helpers/utils.js';
import Resource from '../models/resourceModel.js';

const resourceRouter = express.Router();

resourceRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resourceCategory = req.query.resourceCategory || '';
    const ResourceCategoryFilter = resourceCategory ? { resourceCategory } : {};
    const resources = await Resource.find({
      ...ResourceCategoryFilter
    });
    res.send({ resources });
  })
);

resourceRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Resource.remove({});
    const createdResources = await Resource.insertMany(data.resources);
    res.send({ createdResources });
  })
);

resourceRouter.post(
  '/new',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resource = new Resource({
      title: req.body.title,
      resource_url: req.body.resource_url,
      resource_category_id: req.body.resource_category_id
    });
    const createdResource = await resource.save();
    res.send({ message: 'Resource Created', resource: createdResource });
  })
);

resourceRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
      resource.title = req.body.title,
      resource.resource_url = req.body.resource_url,
      resource.resource_category_id = req.body.resource_category_id
      const updatedResource = await resource.save();
      res.send({ message: 'Resource Updated', resource: updatedResource });
    } else {
      res.status(404).send({ message: 'Resource  Not Found' });
    }
  })
);

resourceRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    console.log(resource);
    if (resource) {
      const deleteResource = await resource.remove();
      res.send({ message: 'Resource Deleted', resource: deleteResource });
    } else {
      res.status(404).send({ message: 'Resource Not Found' });
    }
  })
);

export default resourceRouter;