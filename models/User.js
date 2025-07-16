import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  point: Number,
  done: Array,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
