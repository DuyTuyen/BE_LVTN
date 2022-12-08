const order = require("../models/OrderModel");

const create = (
  { totalBill, r_user, address, name, phone, email, r_OrderDetails },
  session
) => {
  return order.create(
    [{ totalBill, r_user, address, name, phone, email, r_OrderDetails }],
    { session }
  );
};

const updateStatus = ({ id, status, isPaid }, session) => {
  return order
    .findOneAndUpdate(
      { _id: id },
      { status, isPaid, updatedAt: new Date() },
      { new: true }
    )
    .session(session);
};
module.exports = { create, updateStatus };
