const brand = require("../models/BrandModel");

const create = ({ name,img,r_categories }, session) => {
  return brand.create([{ name,img, r_categories }], { session });
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

const updateOne = ({ id, name ,img, r_categories}, session) => {
  return brand
    .findOneAndUpdate(
      { _id: id },
      { name,img,r_categories, updatedAt: new Date() },
      { new: true }
    )
    .session(session);
};

module.exports = { create, getByName, getAll, deleteOne, updateOne };
