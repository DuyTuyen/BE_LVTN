const { validateString } = require("../validations/Validation");
function createBrandDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.name)) return { errMessage: "Name invalid" };
  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };
  return { data: { name: input.name } };
}

module.exports = { createBrandDto };
