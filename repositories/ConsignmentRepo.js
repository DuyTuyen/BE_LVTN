const consignment = require("../models/ConsignmentModel");
const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus"); 
const GetStockProductAggregate = require("../aggregate/GetStockProductAggregate");

const createMany = (creatingConsignments, session) => {
  return consignment.insertMany(creatingConsignments, { session });
};

const getAll = () => {
  return consignment.find({ active: true });
};
const findByProductDetailId = ({r_productDetail,size}, session) => {
  return consignment
    .find({ size, r_productDetail, status: {$in: [CONSIGNMENTSTATUS['IN_STOCK'], CONSIGNMENTSTATUS['COMMING_OUT_OF_STOCK']]} })
    .session(session);
};

const groupByProduct = () => {
  const myAggregate = GetStockProductAggregate()
  return consignment.aggregate(myAggregate)
}

module.exports = { getAll, findByProductDetailId, createMany, groupByProduct };
