import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  userName: { type: String, default: "" },
  hassedPassword: {
    type: String,
    default: ""
  }
});

export default mongoose.model('User', UserSchema);
