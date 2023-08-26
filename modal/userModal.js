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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  userBan: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userModal);
