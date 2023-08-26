const mongoose = require("mongoose")
let Schema = mongoose.Schema
const storeModal = new Schema({
  storeName: {
    type: String,
    require: true,
    unique: true,
  },
  storeSlug: {
    type: String,
    require: true,
    unique: true,
  },
  storeEmail: {
    type: String,
    require: true,
    unique: true,
  },
  storeAddress: {
    type: String,
    require: true,
  },
  storeSlug: {
    type: String,
    require: true,
    unique: true,
  },
}); 