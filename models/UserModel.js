const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const USERROLEENUM = require("../enums/Role")

const userSchema = new mongoose.Schema({
  ...abstractModel,
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: Object.values(USERROLEENUM).map((v) => v),
    default: "Customer",
  },
});
const user = mongoose.model("user", userSchema);

module.exports = user;