const { Router } = require("express");
const router = Router({ mergeParams: true });

const { CustomError } = require("../errors/CustomError");
const importOrderService = require("../services/ImportOrderService");
const { verifyToken } = require("../middlewares/Auth");
const { createImportOrderDto } = require("../dtos/ImportOrderDTO");

const { default: mongoose } = require("mongoose");

router
  .post("/", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
      const importOrderDTO = createImportOrderDto(req.body);
      if (importOrderDTO.hasOwnProperty("errMessage"))
        throw new CustomError(importOrderDTO.errMessage, 400);
      const createdImportOrder = await importOrderService.create(
        importOrderDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(201).json(createdImportOrder);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({message:"Server has something wrong!!"});
      console.error(error.toString());
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
