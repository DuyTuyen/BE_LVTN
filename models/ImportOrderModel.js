const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const importOrderSchema = new mongoose.Schema({
  ...abstractModel,
  importedAt: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: String,
    require: true,
    min: 0,
    default: 0,
  },
  r_importOrderDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "importOrderDetail",
    },
  ],
});


const importOrder = mongoose.model("importOrder", importOrderSchema);

module.exports = importOrder;
