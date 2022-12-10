const user = require("../models/UserModel");

const create = (
  { username, password, name, avatar, phone, address, email, role },
  session
) => {
  return user.create(
    [{
      username,
      password,
      name,
      avatar,
      phone,
      address,
      email,
      role,
    }],
    {session}
  );
};
const getAll = () => {
  return user.find({ active: true });
};
const getAllInActive = () => {
  return user.find({ active: false });
};
const getByUsername = (username) => {
  return user.findOne({ username });
};
const getByEmail = (email) => {
  return user.findOne({ email });
};
const deleteOne = (id, session) => {
  return user.findOneAndUpdate({ _id: id }, { active: false }.session(session));
};

const updateOne = ({ id, name, avatar, phone, address, email }, session) => {
  return user.findOneAndUpdate(
    { _id: id },
    { name, avatar, phone, address, email, updatedAt: new Date() },
    { new: true }.session(session)
  );
};

module.exports = {
  create,
  getByUsername,
  getAllInActive,
  getByEmail,
  getAll,
  deleteOne,
  updateOne,
};
