const { default: mongoose } = require("mongoose");
const { validateString, validateNumber, validateObjectId, validateArray, validateEnum } = require("../validations/Validation");
const SIZEENUM = require("../enums/Size")
const COLORENUM = require("../enums/Color")

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

function getProductByIdDto(id) {
  const errMessages = [];

  if (validateObjectId(id))
    errMessages.push("trường 'id' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return { data: { id } };
}

function productFilterDto(filter) {
  const myFilter = {}
  Object.entries(filter).forEach(([key, value]) => {
    switch (key) {
      case "r_category":
        if(!validateObjectId(value)){
          myFilter["r_category._id"] = mongoose.Types.ObjectId(value)
        }
        break
      case "name":
        if (!validateString(value)) {
          const queryName = value.trim()
          const queryNameArr = queryName.split(' ').map(word => ({
            'name': { $regex: `.*${word}.*`, $options: 'si' }
          }))
          myFilter['$or'] = [
            { 'name': { $regex: `.*${queryName}.*`, $options: 'si' } },
            { $and: queryNameArr }
          ]
        }
        break;
      case "r_brand":
        if (!validateArray(value))
          myFilter['r_brand.name'] = {
            $in: value.reduce((arr, v) => {
              if (!validateString(v))
                return [...arr, v]
              return arr
            }, [])
          }
        break
      case "color":
        if (!validateArray(value))
          myFilter['r_productDetails.color'] = {
            $in: value.reduce((arr, v) => {
              if (!validateEnum(COLORENUM, v))
                return [...arr, v]
              return arr
            },[])
          }
        break
      case "size":
        if (!validateArray(value))
          myFilter['r_productDetails.r_consignments.size'] = {
            $in: value.reduce((arr, v) => {
              if (!validateEnum(SIZEENUM, v))
                return [...arr, v]
              return arr
            },[])
          }
        break
    }
  })
  console.log(myFilter)
  return myFilter
}

module.exports = { createProductDto, updateProductDto, deleteProductDto, getProductByIdDto, productFilterDto };
