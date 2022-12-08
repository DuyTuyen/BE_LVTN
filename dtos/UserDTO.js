const {
  validateString,
  validateEmail,
  validatePhone,
} = require("../validations/Validation");
const RoleEnum = require("../enums/Role");
function createUserDto(reqBody) {
  const input = reqBody;

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

  return {
    data: {
      username: input.username,
      password: input.password,
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
      role: RoleEnum[input.role],
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
module.exports = { createUserDto, updateUserDTO, loginUserDto };
