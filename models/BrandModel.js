const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const brandSchema = new mongoose.Schema({
  ...abstractModel,
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: ""
  }
});

// brandSchema.plugin(mongoosePaginate);
const brand = mongoose.model("brand", brandSchema);

module.exports = brand;
