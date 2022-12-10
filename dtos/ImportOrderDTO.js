const { validateNumber, validateArray, validateDate } = require("../validations/Validation");
const { createImportOrderDetailDto } = require("./ImportOrderDetailDTO");
function createImportOrderDto(reqBody) {
  const input = reqBody;
  const errMessages = [];
  const details = [];

  if (validateNumber(input.totalPrice) && input.totalPrice < 0)
    errMessages.push("trường 'totalPrice' chưa hợp lệ");
  if (validateArray(input.r_importOrderDetails)) {
    errMessages.push("array 'importOrderDetail' chưa hợp lệ");
    input.r_importOrderDetails = []
  }
  if (validateDate(input.importedAt))
    errMessages.push("trường 'importedAt' chưa hợp lệ");

  input.r_importOrderDetails.forEach((detail, index) => {
    const importOrderDetailDto = createImportOrderDetailDto(detail, index);
    if (importOrderDetailDto.hasOwnProperty("errMessage")) {
      errMessages.push(`${importOrderDetailDto.errMessage}`);
    } else details.push(importOrderDetailDto.data);
  });

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((err, index) => `${index}: ` + err + "\n"),
    };

  return {
    data: { totalPrice: input.totalPrice, r_importOrderDetails: details },
  };
}

module.exports = { createImportOrderDto };
