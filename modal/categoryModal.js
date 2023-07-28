const mongoose = require("mongoose");

const categoryModal = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  slug: {
    type: string,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
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
      type: Schema.type.ObjectId,
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
