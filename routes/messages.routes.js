import express from "express";
import {listMessagesByUser} from "../controller/message.controller.js";

const messageRouter= express.Router();

userRouter.get("/list/:id", listMessagesByUser);

export default messageRouter;