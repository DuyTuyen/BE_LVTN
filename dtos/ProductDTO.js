const { validateString, validateNumber } = require("../validations/Validation");

function createProductDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.name)) errMessages.push("trường 'name' chưa hợp lệ");
  if (validateNumber(input.price))
    errMessages.push("trường 'price' chưa hợp lệ");
  // if (validateString(input.r_category))
  //   errMessages.push("trường 'category' chưa hợp lệ");
  // if (validateString(input.r_brand))
  //   errMessages.push("trường 'brand' chưa hợp lệ");
  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return { data: { name: input.name, img: input.img, price: input.price, /*r_category:input.r_category,r_brand: input.r_brand */} };
}

module.exports = { createProductDto };
