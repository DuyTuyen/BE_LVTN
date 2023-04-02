const { Router } = require("express");
const router = Router({ mergeParams: true });

const { CustomError } = require("../errors/CustomError");
const { createUserDto, loginUserDto, forgotPasswordUserDto, updateNewPasswordDto, updateUserDTO } = require("../dtos/UserDTO");
const userService = require("../services/UserService");
const forgotPasswordService = require("../services/ForgotPasswordService")
const nodemailer = require("nodemailer")
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
      const token = await userService.register(userDTO.data, session);
      await session.commitTransaction()
      res.status(201).json(token);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
      console.error(error.toString());
    }
  })

  .post("/login", async (req, res) => {
    try {
      const userDTO = loginUserDto(req.body);
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400);
      const token = await userService.login(isAdminSide = false, userDTO.data);
      res.status(200).json(token);
    } catch (error) {
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
      console.error(error.toString());
    }
  })

  .post("/login/admin", async (req, res) => {
    try {
      const userDTO = loginUserDto(req.body);
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400);
      const token = await userService.login(isAdminSide = true, userDTO.data);
      res.status(200).json(token);
    } catch (error) {
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
      console.error(error.toString());
    }
  })

  .post("/forgot", async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const userDTO = forgotPasswordUserDto(req.body)
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400)
      const foundCustomer = await userService.getByEmail(userDTO.data.email)
      if (!foundCustomer)
        throw new CustomError("tài khoản với email này không tồn tại", 400)

      const createdForgotPassword = await forgotPasswordService.create({ r_user: foundCustomer }, session)
      await session.commitTransaction()
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MY_EMAIL, // generated ethereal user
          pass: process.env.MY_EMAIL_PASSWORD
        },
      });
      // send mail with defined transport object
      await transporter.sendMail({
        from: 'Cửa hàng YODY', // sender address
        to: userDTO.data.email, // list of receivers
        subject: "Lấy lại mật khẩu", // Subject line
        html: `<h1>nhấn vào đường dẫn sau để tạo lại mật khẩu mới <a href="${process.env.UPDATE_NEW_PASSWORD_URL}/${createdForgotPassword[0]._id}">click here</a>`, // html body
      });
      return res.status(201).json({ message: "Vui long kiểm tra mail để thực hiện lấy lại mật khẩu" })
    } catch (error) {
      console.log(error)
      await session.abortTransaction()
      session.endSession()
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      else
        res.status(500).json({ message: "Server has something wrong!!" })
    }
  })
  .post("/updateNewPassword", async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const userDTO = updateNewPasswordDto(req.body)
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400)
      await userService.updateNewPassword({ ...userDTO.data }, session)
      await session.commitTransaction()
      return res.status(201).json({ message: "cập nhật mật khẩu thành công" })
    } catch (error) {
      await session.abortTransaction()
      session.endSession()
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      else
        res.status(500).json({ message: "Server has something wrong!!" })
    }

  })
  .put("/", verifyToken, async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const userDTO = updateUserDTO(req.body)
      if (userDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400)
      const updatedUser = await userService.update({id: req.user.id, ...userDTO.data }, session)
      await session.commitTransaction()
      return res.status(201).json(updatedUser)
    } catch (error) {
      console.log(error)
      await session.abortTransaction()
      session.endSession()
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      else
        res.status(500).json({ message: "Server has something wrong!!" })
    }

  })

  .get("/", verifyToken, async (req, res) => {
    try {
      const foundUser = await userService.getById(req.user.id)
      if (!foundUser)
        throw new CustomError("không tìm thấy thông tin người dùng", 400)

      return res.status(200).json(foundUser)
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      return res.status(500).json(error.toString())
    }
  })
  .get("/all", async (req, res) => {
    try {
      const foundUsers = await userService.getAll()

      return res.status(200).json(foundUsers)
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      return res.status(500).json(error.toString())
    }
  })

module.exports = { router };
