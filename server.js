import express from "express";
import config from "./config/config.js";
import db from "./config/db.js";
import jwt from "jsonwebtoken";
import userModel from "./routes/user.routes.js";
import roomModel from "./model/room.model.js";
import messageModel from "./model/message.model.js";
import userRouter from "./routes/user.routes.js";
import roomRouter from "./routes/room.routes.js";
import messageRouter from "./routes/messages.routes.js"
import { Server } from "socket.io";
import { createServer } from "http";


const app = express();
const httpServer= createServer(app)


const io= new Server(httpServer);

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/room",roomRouter);
app.use("/api/message",messageRouter);


io.use(async ( socket,next)=> {
  try{
    const token = socket.handshake.headers.authorization;
    const verifyToken = jwt.verify(token, config.jwt_secret);

    const currentUser= await userModel.findOne({_id:verifyToken._id});
    if(!currentUser) throw new Error("user not found");
    socket.data.user = currentUser;
    next();

  }catch(err){
    console.log(err);
  }
});



io.on("connection", (socket) => {

  try {
     socket.on("join-room", async (roomId) => {
      

      const checkRoomExist = await roomModel.findOne({ roomId });
      if (!checkRoomExist) return socket.emit("join", "Room not found");

      const roomName = `${checkRoomExist.name}-${checkRoomExist.roomId}`;
      socket.join(roomName);
      io.to(roomName).emit("join", `${socket.data.user.name} has joined !!`);
    });

    
    socket.on("leave-room", async (roomId) => {
      socket.leave(roomId);
      socket.emit("join", `You left room ${roomId}`);
    });

  
    socket.on("msg", async (payload) => {
      const checkExistingRoom = await roomModel.findOne({
        roomId: payload.room,
      });
      if (!checkExistingRoom) return;
      const roomName = `${checkExistingRoom.name}-${checkExistingRoom.roomId}`;
      const savedMsg = await messageModel.create({
        sender: socket.data.user._id,
        messageType: payload.messageType,
        message: payload.message,
        media: payload.media,
        room: checkExistingRoom._id,
      });
      await savedMsg.populate("sender room");
      io.to(roomName).emit("msg", savedMsg);
    });

    console.log("user connected");
  } catch (err) {
    console.log(err);
  }
});





db.then(() => {
  console.log("Database connected..");
}).catch((err) => {
  console.log("Error in db");
});



httpServer.listen(config.port, () => {
  console.log(`server running at port ${config.port}`);
});


