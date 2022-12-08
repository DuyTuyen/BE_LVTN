const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const voucherSchema = new mongoose.Schema({
  ...abstractModel,
  dateStart: {
    type: Date,
    require: true,
  },
  dateEnd: {
    type: Date,
    require: true,
  },
  percent: {
    type: String,
    require: true,
  },
  r_order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
});

const voucher = mongoose.model("voucher", voucherSchema);

module.exports = voucher;
    