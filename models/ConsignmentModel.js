const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus")
const SIZEENUM = require("../enums/Size")

const consignmentSchema = new mongoose.Schema({
  ...abstractModel,
  size: {
    type: String,
    enum: Object.values(SIZEENUM).map((v  ) => v),
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  importedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: Object.values(CONSIGNMENTSTATUS).map(v => v),
    default: "new",
  },
  r_productDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productDetail",
  },
});

const consignment = mongoose.model("consignment", consignmentSchema);

module.exports = consignment;
