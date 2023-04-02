const user = require("../models/UserModel");
const ROLE = require("../enums/Role")

const create = async (
  { username, password, name, avatar, phone, address, email, r_role, r_permissions },
  session
) => {
  const createdUser = await user.create(
    [{
      username,
      password,
      name,
      avatar,
      phone,
      address,
      email,
      r_role,
      r_permissions
    }],
    {session}
  );
  return user.findById(createdUser[0]._id).populate([
    {
      path: "r_role",
      select: "_id title"
    },
    {
      path: "r_permissions",
      select: "_id type"
    }
  ]).session(session)
};
const getAll = () => {
  return user.find({}).populate([
    {
      path: "r_role",
      select: "_id title"
    },
    {
      path: "r_permissions",
      select: "_id type"
    }
  ]);
};

const getAllInActive = () => {
  return user.find({ active: false }).populate([
    {
      path: "r_role",
      select: "_id title"
    },
    {
      path: "r_permissions",
      select: "_id type"
    }
  ]);
};
const getByUsername = (username) => {
  return user.findOne({ username }).populate([
    {
      path: "r_role",
      select: "_id title"
    },
    {
      path: "r_permissions",
      select: "_id type"
    }
  ]);
};

const getByUsernameAdmin = (username) => {
  return user
    .findOne({ username, r_role: "63b43b10d2b4fb76095181d5" })
    .populate([
      {
        path: "r_role",
        select: "_id title",
      },
      {
        path: "r_permissions",
        select: "_id type",
      },
    ]);
};

const getByEmail = (email) => {
  return user.findOne({ email }).populate([
    {
      path: "r_role",
      select: "_id title"
    },
    {
      path: "r_permissions",
      select: "_id type"
    }
  ]);
};
const deleteOne = (id, session) => {
  return user.findOneAndUpdate({ _id: id }, { active: false }.session(session));
};

const updateOne = ({ id, name, phone, address, email }, session) => {
  return user.findOneAndUpdate(
    { _id: id },
    { name, phone, address, email, updatedAt: Date.now() },
    { new: true }
  ).session(session);
};

const updatePassword = ({id, password},session) =>{
  return user.findOneAndUpdate({_id: id},{password, updatedAt: new Date()}, {new:true}).session(session)
}

const getById = (id) => {
  return user.findOne({_id:id, active:true}).select("_id name email phone address")
}

module.exports = {
  create,
  getByUsername,
  getByUsernameAdmin,
  getAllInActive,
  getByEmail,
  getAll,
  deleteOne,
  updateOne,
  getById,
  updatePassword
};
