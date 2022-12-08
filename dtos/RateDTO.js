const { validateString, validateNumber } = require("../validations/Validation");
function createRateDto(reqBody) {
  const input = reqBody;

  if (validateString(input.comment)) return { errMessage: "Comment invalid" };
  if (validateNumber(input.star) || input.star < 1 || input.star > 5) return { errMessage: "Star invalid" };
    return { data: { name: input.comment, star: input.star } };
}

module.exports = { createRateDto };
