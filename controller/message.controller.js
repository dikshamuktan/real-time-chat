import messageModel from "../model/message.model.js";
import mongoose from "mongoose";


 export const listMessagesByUser= async(req,res)=>{
    try{
       const list= await messageModel.aggregate([
        {
            $match:{},
        },
        {
            $group:{
                _id:"$room",
                // totalMessages:{$sum:1},
                messages:{
                    $push:{
                        message:"$message",
                        media:"$media",
                        messageType:"$messageType",
                    },
                },
            },
        },
       ]);

    }catch(err){
      res.json({ msg: `${err.message || "somethign went wrong"}` });    
    }
};