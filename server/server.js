import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import userRouter from './routers/userRouter.js';
import feedRouter from './routers/feedRouter.js';
import eventRouter from './routers/eventRouter.js';
import groupRouter from './routers/groupRouter.js';
import feedCategoryRouter from './routers/categoryRouter.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', userRouter);
app.use('/api/feeds', feedRouter);
app.use('/api/categories', feedCategoryRouter);
app.use('/api/events', eventRouter);
app.use('/api/groups', groupRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

