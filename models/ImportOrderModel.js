const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const importOrderSchema = new mongoose.Schema({
  ...abstractModel,
  importDate: {
    type: Date,
    require: true,
  },
  totalPrice: {
    type: String,
    require: true,
    min: 0,
    default: 0,
  },
  r_importOrderDetail: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "importOrderDetail",
    },
  ],
});


const importOrder = mongoose.model("importOrder", importOrderSchema);

module.exports = importOrder;
