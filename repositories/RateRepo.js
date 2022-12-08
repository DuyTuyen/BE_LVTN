const rate = require("../models/CategoryModel");

const create = ({ comment, star}) => {
  return rate.create({ comment, star });
};

const getAll = () => {
  return rate.find({ active: true });
};

// const getWithPagination = (paginationOption) => {
//     return rate.paginate({active:true},paginationOption)
// }

const getById = (id) => {
  return rate.findOne({ id });
};

const deleteOne = (id) => {
  return rate.findOneAndUpdate({ _id: id }, { active: false });
};

const updateOne = (id, { name, img }) => {
  return rate.findOneAndUpdate({ _id: id }, { name, img }, { new: true });
};

module.exports = { create, getById, getAll, deleteOne, updateOne };
