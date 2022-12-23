const { default: mongoose } = require("mongoose");
const GetImportOrderAggregate = require("../aggregate/GetImportOrderAggregate");
const importOrder = require("../models/ImportOrderModel");

const create = async ({ totalPrice, r_importOrderDetails, r_user }, session) => {
  const createdImportOrder =  await importOrder.create([{ totalPrice, r_importOrderDetails, r_user }], {
    session,
  });
  const filter = {_id: mongoose.Types.ObjectId(createdImportOrder[0]._id)}
  const myAggregate = GetImportOrderAggregate(filter)
  console.log(myAggregate)
  return importOrder.aggregate(myAggregate).option({ session: session })
};

const getAll = () => {
  const myAggregate = GetImportOrderAggregate()
  return importOrder.aggregate(myAggregate);
};
module.exports = { create, getAll };
