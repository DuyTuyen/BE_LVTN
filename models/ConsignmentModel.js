const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const consignmentSchema = new mongoose.Schema({
  ...abstractModel,
  importPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  exportPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  importedAt: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    enum: ["in_stock", "out_of_stock", "comming_out_of_stock"],
    default: "in_stock",
  },
  r_productDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productDetail",
  },
});

const consignment = mongoose.model("consignment", consignmentSchema);

module.exports = consignment;
