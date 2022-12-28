const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const rateSchema = new mongoose.Schema({
  ...abstractModel,
  comment: {
    type: String,
  },
  star: {
    type: Number,
  },
  r_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  r_products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  r_order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
});

const rate = mongoose.model("rate", rateSchema);

module.exports = rate;
