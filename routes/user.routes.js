import express from "express";
import {
  getUser,
  loginUser,
  registerUser,

} from "../controller/user.controller.js";

// import verifyAccessToken from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter
  .get("/", getUser)
  .post("/register", registerUser)
  .post("/login",loginUser)

export default userRouter;
