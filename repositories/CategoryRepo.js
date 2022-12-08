const category = require("../models/CategoryModel");

const create = ({ name },session) => {
  return category.create([{ name }],{session});
};

const getAll = () => {
  return category.find({ active: true });
};

// const getWithPagination = (paginationOption) => {
//     return category.paginate({active:true},paginationOption)
// }

const getByName = (name) => {
  return category.findOne({ name });
};

const deleteOne = (id,session) => {
    return category.findOneAndUpdate({ _id: id }, { active: false }).session(session)
}

const updateOne = ({id, name, img },session) => {
    return category.findOneAndUpdate({ _id: id }, { name, img }, { new: true }).session(session);
}

module.exports = { create, getByName, getAll, deleteOne, updateOne };
