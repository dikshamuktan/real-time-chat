import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../model/user.model.js";

const verifyAccessToken = async (req, res, next) => {
  try {
    const accesstoken = req.headers?.authorization?.split(" ")[1];
    if(!accesstoken){
      const err = new Error('Invalid Token')
      err.statusCode = 400
      throw err;
    }
    const verifiedUser = jwt.verify(accesstoken, config.jwt_secret);
    const currentUser = await userModel.findOne({ _id: verifiedUser._id });
    if(!currentUser){
      const err = new Error('User not found')
      err.statusCode = 404
      throw err;
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(err?.statusCode || 500).json({ msg: err?.message });
  }
};

export default verifyAccessToken;