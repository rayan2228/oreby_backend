const mongoose = require("mongoose");

const userModal = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  merchant: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "customer",
    enum: ["admin", "merchant", "customer"],
  },
  facebookId: {
    type: String,
  },
  linkedInId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("user", userModal);
