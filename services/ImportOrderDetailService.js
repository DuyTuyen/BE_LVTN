const importOrderDetailRepo = require("../repositories/ImportOrderDetailRepo");

function getAll() {
  return importOrderDetailRepo.getAll();
}

function createMany(importOrderDetailDTOs, session) {
  return importOrderDetailRepo.createMany(importOrderDetailDTOs, session);
}

module.exports = { getAll, createMany };
