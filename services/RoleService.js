const roleRepo = require("../repositories/Rolerepo");

function getAll() {
    return roleRepo.getAll();
}

function getById(id) {
    return roleRepo.getById(id);
}

module.exports = { getAll, getById };
