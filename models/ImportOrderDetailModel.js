const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const SIZEENUM = require("../enums/Size")

const importOrderDetailSchema = new mongoose.Schema({
  ...abstractModel,
  quantity: {
    type: Number,
    require: true,
    min: 0,
    default: 1,
  },
  price: {
    type: String,
    require: true,
    min: 0,
    default: 0,
  },
  size: {
    type: String,
    enum: Object.values(SIZEENUM).map((v  ) => v),
  },
  r_productDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productDetail",
  },
});

const importOrderDetail = mongoose.model("importOrderDetail", importOrderDetailSchema);

module.exports = importOrderDetail;
