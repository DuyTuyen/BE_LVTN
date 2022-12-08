const importOrderDetail = require("../models/ImportOrderDetailModel");

const create = ({ quantity, price, r_productDetail }, session) => {
  return importOrderDetail.create([{ quantity, price, r_productDetail }], {
    session,
  });
};

const createMany = (creatingDetails, session) => {
  return importOrderDetail.insertMany(creatingDetails, { session });
};

const getAll = () => {
  return importOrderDetail.find({ active: true });
};

module.exports = { create, getAll, createMany };
