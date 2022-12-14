const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseArregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = new mongoose.Schema({
  ...abstractModel,
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    min: 0,
    default: 0,
  },
  des: {
    type: String,
    default: ""
  },
  r_productDetails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "productDetail",
  }],
  r_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  r_brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
  },
});

productSchema.plugin(mongoosePaginate);
productSchema.plugin(mongooseArregatePaginate)

const product = mongoose.model("product", productSchema);

module.exports = product;
