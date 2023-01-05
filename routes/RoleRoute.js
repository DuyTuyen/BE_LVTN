const { Router } = require("express");
const router = Router({ mergeParams: true });
const roleService = require("../services/RoleService");

router
  .get("/", async (req, res) => {
    try {
      const roles = await roleService.getAll()
      return res.status(200).json(roles)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server has something wrong!!" })
    }
  })
 
module.exports = { router };
