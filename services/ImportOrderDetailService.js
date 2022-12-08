const importOrderDetailRepo = require("../repositories/ImportOrderDetailRepo");

function getAll() {
  return importOrderDetailRepo.getAll();
}

function create(importOrderDetailDTO, session) {
  return importOrderDetailRepo.create(importOrderDetailDTO, session);
}

module.exports = { getAll, create };
