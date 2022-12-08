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
  r_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const rate = mongoose.model("rate", rateSchema);

module.exports = rate;
