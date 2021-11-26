import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routers/userRouter.js";
import feedRouter from "./routers/feedRouter.js";
import answerRouter from "./routers/answerRouter.js";
import eventRouter from "./routers/eventRouter.js";
import groupRouter from "./routers/groupRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import profileRouter from "./routers/profileRouter.js";
import messageRouter from './routers/messageRouter.js';
import volunteerRouter from "./routers/volunteerRouter.js";
import { Server } from 'socket.io';
import Axios from 'axios'; 

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
//app.use(cors({ origin: "http://localhost:3000" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRouter);
app.use("/api/feeds", feedRouter);
app.use("/api/answers", answerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/events", eventRouter);
app.use("/api/groups", groupRouter);
app.use("/api/profiles", profileRouter);
app.use('/api/messages', messageRouter);
app.use("/api/volunteers", volunteerRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: {
  origin: "http://localhost:3000/",
  methods: ["GET", "POST"]
  } 
});

io.on("connection", (socket) => {
  console.log("We have a new connection: ", socket.id);

  socket.on("sendMessage", (newMessageObj, callback) => {
    console.log("Websocket server received a new message:", newMessageObj);
    socket.broadcast.emit("message", newMessageObj);
    callback(); // Clears the field and sets history

    Axios
      .post(`http://localhost:5000/api/messages/new`, newMessageObj);
      // .then((res) => console.log(res))
      // .catch((error) => console.log(error));
  });

  socket.on("disconnect", () => {
    console.log("Connection disconnected for: ", socket.id);
  });
});


httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
