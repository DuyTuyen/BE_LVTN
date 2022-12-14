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
        throw new CustomError("t??i kho???n v???i email n??y kh??ng t???n t???i", 400)

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
        from: '"L??o t??n ????', // sender address
        to: userDTO.data.email, // list of receivers
        subject: "L???y l???i m???t kh???u", // Subject line
        html: `<h1>nh???n v??o ???????ng d???n sau ????? t???o l???i m???t kh???u m???i <a href="${process.env.UPDATE_NEW_PASSWORD_URL}/${createdForgotPassword[0]._id}">click here</a>`, // html body
      });
      return res.status(201).json({ message: "Vui long ki???m tra mail ????? th???c hi???n l???y l???i m???t kh???u" })
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
      return res.status(201).json({ message: "c???p nh???t m???t kh???u th??nh c??ng" })
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
        throw new CustomError("kh??ng t??m th???y th??ng tin ng?????i d??ng", 400)

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
