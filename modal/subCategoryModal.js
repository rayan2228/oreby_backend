const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subCategoryModal = new Schema({
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
  categoryId: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("subCategory", subCategoryModal);
