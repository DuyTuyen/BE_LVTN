const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const orderSchema = new mongoose.Schema({
  ...abstractModel,
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  totalBill: {
    type: Number,
    require: true,
    min: 0,
    default: 0,
  },
  payment: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    default: "1",
  },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
