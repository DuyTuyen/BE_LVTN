const importOrderDetail = require("../models/ImportOrderDetailModel");

const createMany = (creatingDetails, session) => {
  return importOrderDetail.insertMany(creatingDetails, { session });
};

const getAll = () => {
  return importOrderDetail.find({ active: true });
};
module.exports = {  getAll, createMany };
