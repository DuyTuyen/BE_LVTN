const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const SIZEENUM = require("../enums/Size")

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
  },
  r_productDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "r_productDetail",
  },
  size: {
    type: String,
    enum: Object.values(SIZEENUM).map((v  ) => v),
  },
});

const orderDetail = mongoose.model("orderDetail", orderDetailSchema);

module.exports = orderDetail;
