const { Router } = require("express");
const router = Router({ mergeParams: true });
const permissionService = require("../services/PermissionService");

router
  .get("/", async (req, res) => {
    try {
      const permissions = await permissionService.getAll()
      return res.status(200).json(permissions)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server has something wrong!!" })
    }
  })
 
module.exports = { router };
