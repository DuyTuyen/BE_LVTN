const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const COLORENUM = require("../enums/Color")
const SIZEENUM = require("../enums/Size")

const productDetailSchema = new mongoose.Schema({
  ...abstractModel,
  color: {
    type: String,
    enum: Object.values(COLORENUM).map((v) => v),
    default: "BLACK",
  },
  size: {
    type: String,
    enum: Object.values(SIZEENUM).map((v  ) => v),
    default: "S",
  },
  img: {
    type: String,
    default: "",
  },
  r_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const productDetail = mongoose.model("productDetail", productDetailSchema);

module.exports = productDetail;
