const { Router } = require("express");
const router = Router({ mergeParams: true });

const bcrypt = require("bcrypt");
const { CustomError } = require("../errors/CustomError");
const { createUserDto, loginUserDto } = require("../dtos/UserDTO");
const userService = require("../services/UserService");
const { signToken } = require("../utils/SignToken");
const { verifyToken } = require("../middlewares/Auth");
const { default: mongoose } = require("mongoose");

router
  .post("/register", async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction();
    try {
      const userDTO = createUserDto(req.body);
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400);
      const hashPassword = await bcrypt.hashSync(userDTO.data.password, 10);
      userDTO.data.password = hashPassword;
      const createduser = await userService.create(userDTO.data, session);
      await session.commitTransaction()
      const signedToken = signToken(createduser);
      res.status(201).json({ signedToken });    
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json("Server has something wrong!!");
      console.error(error.toString());
    }
  })
  .post("/login", async (req, res) => {
    try {
      const userDTO = loginUserDto(req.body);
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400);
      console.log(userDTO.data.username);
      const foundUser = await userService.getByUsername(userDTO.data.username);
      if (!foundUser) throw new CustomError("user không tồn tại", 400);
      const isSamePassword = await bcrypt.compareSync(
        userDTO.data.password,
        foundUser.password
      );
      if (!isSamePassword)
        throw new CustomError("mật khẩu không trùng khớp", 400);
      const signedToken = signToken(foundUser);
      res.status(201).json({ signedToken });
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json("Server has something wrong!!");
      console.error(error.toString());
    }
  })
  .get("/",verifyToken,async (req,res)=>{
    try{
        return res.status(200).json(req.user)
    }catch{
        return res.status(500).json( err.toString())
    }
})

module.exports = { router };
