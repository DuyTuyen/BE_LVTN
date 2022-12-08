const userRepo = require("../repositories/UserRepo")

function getAll() { return userRepo.getAll(); }
function getByUsername(userName) {
  return userRepo.getByUsername(userName);
}

function getById(id) {
  return userRepo.getById(id);
}
function getByEmail(email) {
  return userRepo.getByEmail(email)
}
function create(userDTO,session) {
    return userRepo.create(userDTO,session);
}
function update(userDTO,session) {
    return userRepo.update(userDTO,session)
}
function deleteOne(id) {
  return userRepo.deleteOne(id,{new: true})
}
module.exports = { getAll, getByEmail, getByUsername, getById, create, update,deleteOne };