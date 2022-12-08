const importOrder = require("../models/ImportOrder");

const create = ({ totalPrice, r_importOrderDetails, r_user }, session) => {
  return importOrder.create([{ totalPrice, r_importOrderDetails, r_user }], {
    session,
  });
};

const getAll = () => {
  return importOrder.find({ active: true });
};

module.exports = { create, getAll };
