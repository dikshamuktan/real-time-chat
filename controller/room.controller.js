import roomModel from "../model/room.model.js";

//post
export const addRoom= async (req, res) => {
    try{
     const list = await roomModel.create({...req.body});
     res.json(list);

    }catch(err){
        res.json({ err: err?.message || "something went wrong while creating room" });
    }
};

//list
export const listRoom= async(req, res) =>{
    try{
     const list= await roomModel.find().sort({_id:-1})
     res.json(list);

    }catch(err){
        res.json({err:err?.message || "something went wrong while listing in"});
    }
};


export const deleteRoom= async(req,res)=>{
    try{
    const list= await roomModel.findOneAndDelete({_id:req.params.id})
    res.json(list);
    }catch(err){
        res.json({err:err?.message || "something went wrong while deleting room"})
    }
};