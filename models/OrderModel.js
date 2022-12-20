const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const ORDERSTATUSENUM = require("../enums/OrderStatus")

const orderSchema = new mongoose.Schema({
  ...abstractModel,
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
    maxLength: 11
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true
  },
  totalBill: {
    type: Number,
    require: true,
    min: 0,
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  r_orderDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderDetail",
    },
  ],
  status: {
    type: String,
    enum: Object.values(ORDERSTATUSENUM).map(v => v),
    default: "new"
  },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
