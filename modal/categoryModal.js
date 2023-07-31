const mongoose = require("mongoose");
let Schema = mongoose.Schema
const categoryModal = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "processing",
    enum: ["processing", "approved", "rejected"],
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("category", categoryModal);
