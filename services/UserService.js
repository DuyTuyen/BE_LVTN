const { CustomError } = require("../errors/CustomError");
const userRepo = require("../repositories/UserRepo");
const roleRepo = require("../repositories/RoleRepo")
const { signToken } = require("../utils/SignToken");
const bcrypt = require("bcrypt");
const forgotPasswordRepo = require("../repositories/ForgotPasswordRepo")
const FORGOTPASSWORDSTATUS = require("../enums/ForgotPasswordStatus");
const Role = require("../enums/Role");

function getAll() { 
  return userRepo.getAll();
}

function getByUsername(userName) {
  return userRepo.getByUsername(userName);
}

function getById(id) {
  return userRepo.getById(id);
}

function getByEmail(email) {
  return userRepo.getByEmail(email)
}

async function login(isAdminSide, userDTO) {
  let foundUser = null
  if(!isAdminSide)
    foundUser = await userRepo.getByUsername(userDTO.username);
  else 
    foundUser = await userRepo.getByUsernameAdmin(userDTO.username)
  if (!foundUser) throw new CustomError("user không tồn tại", 400);
  const isSamePassword = await bcrypt.compareSync(
    userDTO.password,
    foundUser.password
  );
  if (!isSamePassword)
    throw new CustomError("mật khẩu không trùng khớp", 400);
  const signedToken = signToken(foundUser);
    return Promise.resolve(signedToken);
}

async function register(userDTO,session) {
  const foundRole = await roleRepo.getByTitle(Role.CUSTOMER)
  const hashPassword = await bcrypt.hashSync(userDTO.password, 10);
  const createdUser =  await userRepo.create({...userDTO, password: hashPassword, r_role: foundRole},session);
  return Promise.resolve(signToken(createdUser));
}

function update(userDTO,session) {
    return userRepo.updateOne(userDTO,session)
}

async function updateNewPassword(userDTO, session){
  try {
      const updateForgotPassword = await forgotPasswordRepo.updateStatus({id: userDTO.token, status: FORGOTPASSWORDSTATUS.VERIFIED}, session)
      const hashPassword = await bcrypt.hashSync(userDTO.password, 10)
      await userRepo.updatePassword({id: updateForgotPassword.r_user, password: hashPassword},session)
      return Promise.resolve()
  } catch (error) {
      return Promise.reject(new CustomError(error.toString(),500))
  }
}

function deleteOne(id) {
  return userRepo.deleteOne(id,{new: true})
}

module.exports = { getAll, getByEmail, getByUsername, getById, login, register,  update,deleteOne, updateNewPassword };