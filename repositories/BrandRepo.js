const brand = require("../models/BrandModel");

const create = ({ name,img }, session) => {
  return brand.create([{ name,img }], { session });
};

const getAll = () => {
  return brand.find({ active: true });
};

// const getWithPagination = (paginationOption) => {
//     return brand.paginate({active:true},paginationOption)
// }

const getByName = (name) => {
  return brand.findOne({ name });
};

const deleteOne = (id, session) => {
  return brand.findOneAndUpdate(
    { _id: id },
    { active: false }.session(session)
  );
};

const updateOne = ({ id, name ,img}, session) => {
  return brand
    .findOneAndUpdate(
      { _id: id },
      { name,img, updatedAt: new Date() },
      { new: true }
    )
    .session(session);
};

module.exports = { create, getByName, getAll, deleteOne, updateOne };
