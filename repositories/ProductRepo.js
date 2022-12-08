const product = require("../models/ProductModel");

const create = async ({ name, price, r_category, r_brand }, session) => {
  return product.create([{ name, price, r_category, r_brand }], { session });
};

const getAll = () => {
  return product
    .find({ active: true })
    .populate("r_brand")
    .populate("r_category")
    .populate("r_productDetails");
};

const pushOneProductDetail = ({ id, r_productDetail }, session) => {
  return product
    .findOneAndUpdate(
      { _id: id },
      { $push: { r_productDetails: r_productDetail, updatedAt: new Date() } },
      { new: true }
    )
    .session(session);
};

module.exports = {
  getAll,
  create,
  pushOneProductDetail,
};
