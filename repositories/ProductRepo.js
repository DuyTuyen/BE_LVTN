const { default: mongoose } = require("mongoose");
const GetProductAggregate = require("../aggregate/GetProductAggregate");
const product = require("../models/ProductModel");

const create = async ({ name, price, r_category, r_brand, des }, session) => {
  const createdProduct = await product.create([{ name, price, r_category, r_brand, des }], { session });
  return product.findById(createdProduct[0]._id)
    .populate([
      "r_brand",
      "r_category",
    ])
    .session(session)
};

const update = async ({ id, name, price, r_category, r_brand, des }, session) => {
  return product.findOneAndUpdate(
    { _id: id },
    { name, price, des, r_category, r_brand, updatedAt: new Date() },
    { new: true }
  )
    .populate([
      "r_brand",
      "r_category",
      "r_productDetails"
    ])
    .session(session)
};

const deleteOne = async (id, session) => {
  return product.findOneAndUpdate(
    { _id: id },
    { active: false, updatedAt: new Date() }
  )
    .session(session)
};

const getAll = (isAdminSide) => {
  if (isAdminSide) {
    return product.find({})
      .populate([
        "r_brand",
        "r_category",
        "r_productDetails"
      ])
  } else {
    const myAggregate = GetProductAggregate()
    return product.aggregate(myAggregate)
  }
};

const getProductById = (id) => {
  const filter = { _id: mongoose.Types.ObjectId(id) }
  const myAggregate = GetProductAggregate(filter)
  return product.aggregate(myAggregate)
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

const pullOneProductDetail = ({ id, r_productDetail }, session) => {
  return product
    .findOneAndUpdate(
      { _id: id },
      { $pull: { r_productDetails: r_productDetail, updatedAt: new Date() } },
      { new: true }
    )
    .session(session);
};

module.exports = {
  getAll,
  getProductById,
  create,
  update,
  deleteOne,
  pushOneProductDetail,
  pullOneProductDetail
};
