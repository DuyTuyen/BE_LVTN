const { validateObjectId } = require("../validation/validation");
const { validateNumber } = require("../validation/validation");

function createOrderDetailDto(reqBody, index) {
  const input = reqBody;

  const errMessages = [];

  if (validateNumber(input.quantity) && input.quantity < 0) {
    errMessages.push(
      `trường 'details.quantity' tại index ${index} chưa hợp lệ`
    );
  }
  if (validateNumber(input.price) && input.price < 0) {
    errMessages.push(`trường 'details.price' tại index ${index} chưa hợp lệ`);
  }
  if (validateObjectId(input.r_productDetail)) {
    errMessages.push(
      `trường 'details.r_productDetail' tại index ${index} chưa hợp lệ`
    );
  }

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return {
    data: {
      quantity: input.quantity,
      price: input.price,
      r_productDetail: input.r_productDetail,
    },
  };
}

module.exports = { createOrderDetailDto };
