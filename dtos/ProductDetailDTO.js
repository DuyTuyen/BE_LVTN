const { validateEnum, validateObjectId } = require("../validations/Validation");
const COLORENUM = require("../enums/Color");
const SIZEENUM = require("../enums/Size");

function createProductDetailDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateEnum(COLORENUM, input.color))
    errMessages.push("trường 'color' chưa hợp lệ");
  if (validateEnum(SIZEENUM, input.size))
    errMessages.push("trường 'size' chưa hợp lệ");
  if (validateObjectId(input.r_product))
    errMessages.push("trường 'r_product' chưa hợp lệ");
  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  const data = {
    color: input.color,
    size: input.size,
    r_product: input.r_product,
  };
  if (input.img !== "") data["img"] = input.img;
  return { data };
}

function updateProductDetailDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (input.color !== undefined && validateEnum(COLORENUM, input.color))
    errMessages.push("trường 'color' chưa hợp lệ");
  if (input.size !== undefined && validateEnum(SIZEENUM, input.size))
    errMessages.push("trường 'size' chưa hợp lệ");
  if (validateObjectId(input.id)) errMessages.push("trường 'id' chưa hợp lệ");
  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  const data = { color: input.color, size: input.size, id: input.id };
  if (input.img !== "") data["img"] = input.img;
  return { data };
}


module.exports = { createProductDetailDto,updateProductDetailDto };
