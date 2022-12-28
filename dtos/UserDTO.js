const {
  validateString,
  validateEmail,
  validatePhone,
  validateEnum,
  validateObjectId
} = require("../validations/Validation");
const RoleEnum = require("../enums/Role");

function createUserDto(reqBody) {
  const input = reqBody;
  const errMessages = []

  if (validateString(input.username))
    return { errMessage: "User name invalid" };
  if (validateString(input.password)) return { errMessage: "Password invalid" };
  if (validatePhone(input.phone)) return { errMessage: "Phone invalid" };
  if (validateEmail(input.email)) return { errMessage: "Email invalid" };
  if (validateString(input.address)) return { errMessage: "Address invalid" };
  if (validateEnum(RoleEnum, input.role))
    errMessages.push("trường 'role' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };
    console.log(input)
  return {
    data: {
      username: input.username,
      password: input.password,
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
      role: input.role,
    },
  };
}
function updateUserDTO(reqBody) {
  const input = reqBody;

  if (validateString(input.address)) return { errMessage: "Address invalid  " };
  if (validateString(input.name)) return { errMessage: "Name invalid  " };
  if (validatePhone(input.phone))
    return { errMessage: "Phone number invalid  " };
  if (validateEmail(input.email)) return { errMessage: "Email invalid  " };

  return {
    data: {
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
      
    },
  };
}
function loginUserDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.username))
    errMessages.push("trường 'username' chưa hợp lệ");
  if (validateString(input.password))
    errMessages.push("trường 'password' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };
  return {
    data: {
      username: input.username,
      password: input.password,
    },
  };
}

function forgotPasswordUserDto(reqBody) {
  const input = reqBody
  const errMessages = []

  if (validateEmail(input.email))
      errMessages.push("trường 'email' chưa hợp lệ")
  if (errMessages.length > 0)
      return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
  return {
      data: {
          email: input.email
      }
  }
}

function updateNewPasswordDto(reqBody) {
  const input = reqBody
  const errMessages = []

  if (validateString(input.password))
      errMessages.push("trường 'password' chưa hợp lệ")
  if (validateObjectId(input.token))
      errMessages.push("trường 'token' chưa hợp lệ")
  if (errMessages.length > 0)
      return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
  return {
      data: {
          password: input.password,
          token: input.token
      }
  }
}
module.exports = { createUserDto, updateUserDTO, loginUserDto, forgotPasswordUserDto, updateNewPasswordDto };
