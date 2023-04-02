const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

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
    unique:true
  },
  r_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
  r_permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "permission",
  }],
  
});
const user = mongoose.model("user", userSchema);

module.exports = user;