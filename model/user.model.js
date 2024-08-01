import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password:{
      type:String,
      require:true,
      select:false
    },
    bio: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
