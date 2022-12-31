const GetTopSoldProductsAggregate = require("../aggregate/GetTopSoldProductsAggregate");
const OrderDetail = require("../models/OrderDetailModel");

const createMany = (creatingDetails, session) => {
  return OrderDetail.insertMany(creatingDetails, { session });
};

const groupAndGetTopSoldProduct = () => {
  const myAggregate = GetTopSoldProductsAggregate()
  return OrderDetail.aggregate(myAggregate)
}
module.exports = { createMany, groupAndGetTopSoldProduct };
