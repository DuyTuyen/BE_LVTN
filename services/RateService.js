const rateRepo = require("../repositories/RateRepo");
const orderRepo = require("../repositories/OrderRepo")

function getByProductId(id) {
  return rateRepo.getByProductId(id);
}

async function create(rateDTO,session) {
  try {
    await orderRepo.updateStatus({id: rateDTO.r_order, isRated: true},session)
    await rateRepo.create(rateDTO,session);
    return Promise.resolve()
  } catch (error) {
    throw new CustomError(error.toString(), 500);
  }
}

module.exports = { create, getByProductId };
