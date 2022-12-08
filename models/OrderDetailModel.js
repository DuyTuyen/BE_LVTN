const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const orderDetailSchema = new mongoose.Schema({
  ...abstractModel,
  quantity: {
    type: Number,
    require: true,
    min: 0,
    default: 1,
  },
  price: {
    type: Number,
    require: true,
    min: 0,
    default: 0,
  }
});

const orderDetail = mongoose.model("orderDetail", orderDetailSchema);

module.exports = orderDetail;
