import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import data from "../data.js";
import Profile from "../models/profileModel.js";
import { generateToken } from "../helpers/utils.js";
const { OAuth2Client } = require("google-auth-library");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
const CLIENT_ID = "541968906767-0v6pfapcciop5ifcqqo5gbu8dmfqkctf.apps.googleusercontent.com"

async function tokenVerify(token, callback) {
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

});
const payload = ticket.getPayload();
const userid = payload['sub'];
 if(!payload.email){
   return callback(null, "invalid token")
 }
let user = await getUserByEmail(payload.email)
 if (user){

  callback({
    user,
    isNew:false
  })
}else{
user = await registerUser({
  email:payload.email,
  name:payload.name,
signInMethod:"googlesignin"
})
callback({
  user,
  isNew:true
})
}



async function getUserByEmail(email){
//return user object
//find user with email
//return a promise
}
async function registerUser(data){
// create a new user record
//return newly created user object
// return  promise
}



userRouter.post(
  "/googlesignin",
  expressAsyncHandler(async (req, res) => {
    tokenVerify(req.body.token,(result, error) =>{
      if (error){
        // send error response
      } else{
        // log user in with result.user object and return user to front end
      }
    } )
  })
);

export default userRouter;
