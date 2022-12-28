const {
  validateString,
  validateNumber,
  validateEnum,
  validatePhone,
  validateEmail,
  validateArray,
  validateObjectId,
} = require("../validations/Validation");
const { createOrderDetailDto } = require("./OrderDetailDTO");
const PAYMENTTYPEENUM = require("../enums/PaymentType");
const ORDERSTATUSENUM = require("../enums/OrderStatus");

function createOrderDto(reqBody) {
  const input = reqBody;
  const errMessages = [];
  const details = [];
  if (validateNumber(input.totalBill))
    errMessages.push("trường 'totalBill' chưa hợp lệ");

  if (validateString(input.address))
    errMessages.push("trường 'address' không hợp lệ");

  if (validateString(input.name))
    errMessages.push("trường 'name' không hợp lệ");

  if (validatePhone(input.phone))
    errMessages.push("trường 'phone' không hợp lệ");

  if (validateEmail(input.email))
    errMessages.push("trường 'email' không hợp lệ");

  if (validateEnum(PAYMENTTYPEENUM, input.paymentType))
    errMessages.push("trường 'paymentType' không hợp lệ");

  if (validateArray(input.r_orderDetails)) {
    errMessages.push("array 'r_orderDetails' chưa hợp lệ");
    input.r_orderDetails = [];
  } else
    input.r_orderDetails.forEach((detail, index) => {
      const orderDetailDto = createOrderDetailDto(detail, index);
      if (orderDetailDto.hasOwnProperty("errMessage")) {
        errMessages.push(`${orderDetailDto.errMessage}`);
      } else details.push(orderDetailDto.data);
    });

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, ""),
    };

  return {
    data: {
      totalBill: input.totalBill,
      r_user: input.r_user,
      address: input.address,
      name: input.name,
      phone: input.phone,
      email: input.email,
      r_orderDetails: details,
      paymentType: input.paymentType,
    },
  };
}

function updateOrderDto(reqBody) {
  const input = reqBody;
  const errMessages = [];
  const details = [];

  if (validateEnum(ORDERSTATUSENUM, input.status))
    errMessages.push("trường 'status' không hợp lệ");

  if (validateObjectId(input.id))
    errMessages.push("trường 'id' không hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, ""),
    };

  return {
    data: {
      status: input.status,
      id: input.id
    },
  };
}

module.exports = { createOrderDto, updateOrderDto };
