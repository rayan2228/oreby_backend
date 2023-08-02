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
  password: {
    type: String,
    require: true,
  },
  emailOTP: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "../images/avatar.jpeg",
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
    default: null,
  },
  linkedInId: {
    type: String,
    default: null,
  },
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

module.exports = mongoose.model("user", userModal);
