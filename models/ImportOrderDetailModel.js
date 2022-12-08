const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const importOrderDetailSchema = new mongoose.Schema({
  ...abstractModel,
  quantity: {
    type: Number,
    require: true,
    min: 0,
    default: 1,
  },
  importPrice: {
    type: String,
    require: true,
    min: 0,
    default: 0,
  },
  exportPrice: {
    
  },
  r_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  r_importOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "importOrder",
  },
});

const importOrderDetail = mongoose.model("importOrderDetail", importOrderDetailSchema);

module.exports = importOrderDetail;
