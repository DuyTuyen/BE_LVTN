const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const VOUCHERSTATUSENUM = require("../enums/VoucherStatus")

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
  status: {
    type: String,
    enum: VOUCHERSTATUSENUM.map(v => v),
    default: "new"
  },
  r_order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
});

const voucher = mongoose.model("voucher", voucherSchema);

module.exports = voucher;
    