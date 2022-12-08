const { Router } = require("express");
const router = Router({ mergeParams: true });
const BrandService = require("../services/BrandService");
const { createBrandDto } = require("../dtos/BrandDTO");
const { CustomError } = require("../errors/CustomError");
const { default: mongoose } = require("mongoose");

router
  .post("/", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const BrandDTO = createBrandDto(req.body);
      if (BrandDTO.hasOwnProperty("errMessage"))
        throw new CustomError(BrandDTO.errMessage, 400);
      const createdBrand = await BrandService.create(BrandDTO.data, session);
      await session.commitTransaction();
      res.status(201).json(createdBrand);
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
      const brands = await BrandService.getAll();
      return res.status(200).json(brands);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete("/:id", (req, res) => {
    BrandService.remove(req.params.id)
      .then((brand) => {
        return res.status(200).json(brand);
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  });

module.exports = { router };
