import mongoose from "mongoose";

const ProblemSetSchema = new mongoose.Schema({
  id: String,
  body: String,
});

export default mongoose.models.ProblemSet ||
  mongoose.model("ProblemSet", ProblemSetSchema);
