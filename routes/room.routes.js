import express from "express";

import{
    addRoom,
    listRoom,
    deleteRoom,
}from "../controller/room.controller.js";


const roomRouter= express.Router();

expressRouter
.get("/list",listRoom)
.post("/create",addRoom)
.post("/delete",deleteRoom)

export default roomRouter;