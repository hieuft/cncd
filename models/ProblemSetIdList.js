import mongoose from "mongoose";

const ProblemSetIdListSchema = new mongoose.Schema({
  list: Array,
});

export default mongoose.models.ProblemSetIdList ||
  mongoose.model("ProblemSetIdList", ProblemSetIdListSchema);
