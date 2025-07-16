import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  type: String,
  body: String,
  time: String,
});

export default mongoose.models.History ||
  mongoose.model("History", HistorySchema);
