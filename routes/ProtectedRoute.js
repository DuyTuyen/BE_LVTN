const { Router } = require("express");
const router = Router({ mergeParams: true });
const { verifyToken, verifyByRole } = require("../middlewares/Auth");
const ROLE = require("../enums/Role")

router
  .get("/admin", verifyToken, verifyByRole([ROLE.ADMIN]),(req, res) => {
      return res.status(200).json({message: "Chào mừng admin"})
  })


module.exports = { router };
