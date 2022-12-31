const { default: mongoose } = require("mongoose");
const GetOrderAggregate = require("../aggregate/GetOrderAggregate");
const GetTopSoldProductsAggregate = require("../aggregate/GetTopSoldProductsAggregate");
const order = require("../models/OrderModel");

const create = (
  { totalBill, r_user, address, name, phone, email, r_orderDetails },
  session
) => {
  return order.create(
    [{ totalBill, r_user, address, name, phone, email, r_orderDetails }],
    { session }
  );
};

const updateStatus = async ({ id, status, isPaid, isRated }, session) => {
  await order
    .findOneAndUpdate(
      { _id: id },
      { status, isPaid, isRated, updatedAt: new Date() },
      {new: true}
    )
    .session(session);
  const myAggregate = GetOrderAggregate({_id: mongoose.Types.ObjectId(id)})
  return order.aggregate(myAggregate).session(session)
}

const getAll = () => {
  const myAggregate = GetOrderAggregate()
  return order.aggregate(myAggregate)
}

const getByUserId = (id) => {
  const filter = { r_user: mongoose.Types.ObjectId(id) }
  const myAggregate = GetOrderAggregate(filter)
  return order.aggregate(myAggregate)
}

const getById = (id,session) => {
  const filter = { _id: mongoose.Types.ObjectId(id) }
  const myAggregate = GetOrderAggregate(filter)
  return order.aggregate(myAggregate).session(session)
}

const getByMonth = (month) => {
  const myAggregate = GetTopSoldProductsAggregate()
  return order.aggregate(myAggregate)
}

module.exports = { getAll, create, updateStatus, getByUserId, getById,getByMonth }
