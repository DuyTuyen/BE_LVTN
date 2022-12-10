const productDetail = require("../models/ProductDetailModel");

const create = async ({ color,img  }, session) => {
  return productDetail.create([{ color,img }], {
    session,
  });
};

const update = (
  { id, color, size, img, r_product, r_consignment },
  session
) => {
  return productDetail
    .findOneAndUpdate(
      { _id: id },
      { color, size, img, r_product, r_consignment, updatedAt: new Date() },
      { new: true }
    )
    .session(session);
};

const updateNullConsignment = ({ id, r_consignment }, session) => {
  return productDetail
    .findOneAndUpdate(
      { _id: id, r_consignment: null },
      { r_consignment, updatedAt: new Date() }
    )
    .session(session);
};

module.exports = { create, update, updateNullConsignment };
