import mongoose from "mongoose";

const ServicePackageSchema = new mongoose.Schema({
  id: String,
  name: String,
  describe: String,
  price: Number,
  discount: Number,
  color: String,
});

export default mongoose.models.ServicePackage ||
  mongoose.model("ServicePackage", ServicePackageSchema);
