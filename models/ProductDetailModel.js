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
  img: {
    type: String,
    default: "",
  },
});

const productDetail = mongoose.model("productDetail", productDetailSchema);

module.exports = productDetail;
