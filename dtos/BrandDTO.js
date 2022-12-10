const { validateString, validateObjectId, validateArray } = require("../validations/Validation")

function createBrandDto(reqBody) {
  const input = reqBody
  const errMessages = []
  if (validateString(input.name))
    errMessages.push("trường 'name' chưa hợp lệ")

  if (validateArray(input.r_categories)) {
    errMessages.push("array 'categories' chưa hợp lệ");
  }

  input.r_categories.forEach((cate) => {
    if (validateObjectId(cate)) {
      errMessages.push(`category ${cate} chưa hợp lệ`);
    }
  });

  if (errMessages.length > 0)
    return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    
  const data = {name: input.name, r_categories: input.r_categories}
  if(input.img !== "")
    data["img"] = input.img

  return { data }
}

function updateBrandDto(id, reqBody) {
  const input = reqBody
  const errMessages = []
  if (input.name !== undefined && validateString(input.name))
    errMessages.push("trường 'name' chưa hợp lệ")
  if (input.r_categories !== undefined) {
    if (validateArray(input.r_categories)) {
      errMessages.push("array 'categories' chưa hợp lệ");
    }

    input.r_categories.forEach((cate) => {
      if (validateObjectId(cate)) {
        errMessages.push(`category ${cate} chưa hợp lệ`);
      }
    });
  }

  if (validateObjectId(id))
    errMessages.push("Id không hợp lệ")

  if (errMessages.length > 0)
    return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

  const data = { id, name: input.name, r_categories: input.r_categories }
  if (input.img !== "")
    data['img'] = input.img
  return { data }
}

module.exports = { createBrandDto, updateBrandDto }
