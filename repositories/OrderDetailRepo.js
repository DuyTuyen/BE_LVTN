const OrderDetail = require("../models/OrderDetailModel");

const createMany = (creatingDetails, session) => {
  return OrderDetail.insertMany(creatingDetails, { session });
};

module.exports = { createMany };
