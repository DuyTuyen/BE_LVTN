const { Router } = require("express");
const router = Router({ mergeParams: true });

const { CustomError } = require("../errors/CustomError");
const exportOrderService = require("../services/ExportOrderService");
const { verifyToken } = require("../middlewares/VerifyToken");
const { createExportOrderDto } = require("../dtos/ExportOrderDTO");

const { default: mongoose } = require("mongoose");

router
  .post("/", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const exportOrderDTO = createExportOrderDto(req.body);
      if (exportOrderDTO.hasOwnProperty("errMessage"))
        throw new CustomError(exportOrderDTO.errMessage, 400);
      exportOrderDTO.data["r_user"] = req.user.id;
      const createdExportOrder = await exportOrderService.create(
        exportOrderDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(201).json(createdExportOrder);
    } catch (error) {
      console.log(error);
      await session.abortTransaction();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json("Server has something wrong!!");
    } finally {
      session.endSession();
    }
  })
  .get("/", verifyToken, (req, res) => {
    try {
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  });

module.exports = { router };
