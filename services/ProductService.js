const productRepo = require("../repositories/ProductRepo");

function getAll(filter) {
  return productRepo.getAll(false,filter);
}

function getAllAdminSide(filter) {
  return productRepo.getAll(true,filter);
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
