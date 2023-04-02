const payment = require("../models/PaymentModel");

const create = ({ type, r_order }, session) => {
  return payment.create([{ type, r_order }], { session });
};

const getAll = () => {
  return payment.find({ active: true });
};

const updateStatus = ({ id, momoId, status }, session) => {
  return payment
    .findOneAndUpdate(
      { _id: id },
      { momoId, status, updatedAt: new Date() },
      { new: true }
    )
    .session(session);
};

const updateStatusByOrderId = ({ orderId, status }, session) => {
  return payment
    .findOneAndUpdate(
      { r_order: orderId },
      { status, updatedAt: new Date() },
      { new: true }
    )
    .session(session);
};

module.exports = { create, getAll, updateStatus, updateStatusByOrderId };
