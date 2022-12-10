const { validateNumber, validateObjectId, validateEnum } = require("../validations/Validation");
const SIZEENUM  = require("../enums/Size")
const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus")

function createImportOrderDetailDto(reqBody, index) {
  const input = reqBody;

  const errMessages = [];

  if (validateNumber(input.quantity) && input.quantity < 0) {
    errMessages.push(
      `trường 'importOrderDetail.quantity' tại index ${index} chưa hợp lệ`
    );
  }
  if (validateNumber(input.price) && input.price < 0) {
    errMessages.push(
      `trường 'importOrderDetail.price' tại index ${index} chưa hợp lệ`
    );
  }
  
  if (validateObjectId(input.r_productDetail)) {
    errMessages.push(
      `trường 'importOrderDetail.r_productDetail' tại index ${index} chưa hợp lệ`
    );
  }

  if (validateEnum(SIZEENUM, input.size)) {
    errMessages.push(
      `trường 'importOrderDetail.size' tại index ${index} chưa hợp lệ`
    );
  }

  if (validateEnum(CONSIGNMENTSTATUS, input.consignmentStatus)) {
    errMessages.push(
      `trường 'importOrderDetail.consignmentStatus' tại index ${index} chưa hợp lệ`
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
      size: input.size,
      consignmentStatus: input.consignmentStatus
    },
  };
}

module.exports = { createImportOrderDetailDto };
