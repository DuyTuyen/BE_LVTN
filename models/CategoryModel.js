const mongoose = require("mongoose");
const abstractModel = require("./AbstractModel");

const categorySchema = new mongoose.Schema({
  ...abstractModel,
  name: {
    type: String,
    required: "Trường 'name' không được bỏ trống",
  },
  img: {
    type: String,
    default: ""
  }
});

// categorySchema.plugin(mongoosePaginate);
const category = mongoose.model("category", categorySchema);

module.exports = category;
