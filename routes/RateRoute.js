const { Router } = require("express");
const router = Router({ mergeParams: true });
const RateService = require("../services/RateService");
const { createRateDto } = require("../dtos/RateDTO");
const { CustomError } = require("../errors/CustomError");

router
  .post("/", async (req, res) => {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      const RateDTO = createBrandDto(req.body);
      if (RateDTO.hasOwnProperty("errMessage"))
        throw new CustomError(RateDTO.errMessage, 400);
      const createdRate = await RateService.create(RateDTO.data);
      await session.commitTransaction();
      res.status(201).json(createdRate);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json("Server has something wrong!!");
      console.error(error.toString());
    }
  })
  .get("/", async (req, res) => {
    try {
      const rates = await RateService.getAll();
      return res.status(200).json(rates);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = { router };
