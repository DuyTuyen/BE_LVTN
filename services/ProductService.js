const productRepo = require("../repositories/ProductRepo");

function getAll() {
  return productRepo.getAll(false);
}

function getAllAdminSide() {
  return productRepo.getAll(true);
}

function getProductById(id) {
  return productRepo.getProductById(id);
}

function create(productDTO,session) {
  return productRepo.create(productDTO,session)
}

function update(productDTO,session) {
  return productRepo.update(productDTO,session)
}

function deleteOne(id,session) {
  return productRepo.deleteOne(id,session)
}



module.exports = { getAll, create, update, deleteOne, getProductById, getAllAdminSide };
