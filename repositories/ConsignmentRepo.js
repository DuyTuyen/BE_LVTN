const consignment = require("../models/ConsignmentModel");
const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus"); 
const GetStockProductAggregate = require("../aggregate/GetStockProductAggregate");
const GetConsignmentAggregate = require("../aggregate/GetConsignmentAggregate");
const { default: mongoose } = require("mongoose");

const createMany = (creatingConsignments, session) => {
  return consignment.insertMany(creatingConsignments, { session });
};

const getAll = (filter) => {
  const myAggregate = GetConsignmentAggregate(filter)
  return consignment.aggregate(myAggregate);
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

const getStockConsignment = (session) => {
  return consignment.find({active:true, status: CONSIGNMENTSTATUS.IN_STOCK}).session(session)
}

const getById = (id,session) => {
  const myAggregate = GetConsignmentAggregate({_id: mongoose.Types.ObjectId(id)})
  return consignment.aggregate(myAggregate).session(session)
}

const updateStatus = async ({id, status},session) => {
  const updatedConsignment = await consignment.findOneAndUpdate({_id: id},{status, updatedAt: Date.now()}).session(session)
  const myAggregate = GetConsignmentAggregate({_id: mongoose.Types.ObjectId(updatedConsignment._id)})
  return consignment.aggregate(myAggregate).session(session)
}

module.exports = { getAll, findByProductDetailId, createMany, groupByProduct,getStockConsignment, updateStatus, getById };
