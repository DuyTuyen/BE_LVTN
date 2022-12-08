const rateRepo = require("../repositories/RateRepo");

function getAll() {
  return rateRepo.getAll();
}

function getByName(name) {
  return rateRepo.getByName(name);
}

function getById(id) {
  return rateRepo.getById(id);
}

function create(rateDTO,session) {
  return rateRepo.create(rateDTO,session);
}

module.exports = { getAll, create, getById, getByName };
