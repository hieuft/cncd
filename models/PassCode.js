import mongoose from "mongoose";

const PassCodeSchema = new mongoose.Schema({
  code: String,
  dist: String,
  remain: Number,
});

export default mongoose.models.PassCode ||
  mongoose.model("PassCode", PassCodeSchema);
