import mongoose from "mongoose";

const PointingRequestSchema = new mongoose.Schema({
  who: String,
  number: Number,
  time: String,
});

export default mongoose.models.PointingRequest ||
  mongoose.model("PointingRequest", PointingRequestSchema);
