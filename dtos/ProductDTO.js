const { validateString, validateNumber, validateObjectId } = require("../validations/Validation");

function createProductDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.name))
    errMessages.push("trường 'name' chưa hợp lệ");
  if (input.des != undefined && validateString(input.des))
    errMessages.push("trường 'des' chưa hợp lệ");
  if (validateNumber(input.price))
    errMessages.push("trường 'price' chưa hợp lệ");
  if (validateObjectId(input.r_category))
    errMessages.push("trường 'category' chưa hợp lệ");
  if (validateObjectId(input.r_brand))
    errMessages.push("trường 'brand' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return { data: { name: input.name, img: input.img, price: input.price, r_category: input.r_category, r_brand: input.r_brand, des: input.des } };
}

function updateProductDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateObjectId(input.id))
    errMessages.push("trường 'id' chưa hợp lệ");
  if (input.name != undefined && validateString(input.name))
    errMessages.push("trường 'name' chưa hợp lệ");
  if (input.des != undefined && validateString(input.des))
    errMessages.push("trường 'des' chưa hợp lệ");
  if (input.price != undefined && validateNumber(input.price))
    errMessages.push("trường 'price' chưa hợp lệ");
  if (input.r_category != undefined && validateObjectId(input.r_category))
    errMessages.push("trường 'category' chưa hợp lệ");
  if (input.r_brand != undefined && validateObjectId(input.r_brand))
    errMessages.push("trường 'brand' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return { data: { id: input.id, name: input.name, img: input.img, price: input.price, r_category: input.r_category, r_brand: input.r_brand, des: input.des } };
}

function deleteProductDto(reqBody) {
  const input = reqBody;
  const errMessages = [];
  
  if (validateObjectId(input.id))
    errMessages.push("trường 'id' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return { data: { id: input.id } };
}

module.exports = { createProductDto, updateProductDto, deleteProductDto };
