const { Router } = require("express");
const router = Router({ mergeParams: true });
const brandService = require("../services/BrandService");
const { createBrandDto, updateBrandDto } = require("../dtos/BrandDTO");
const { CustomError } = require("../errors/CustomError");
const { default: mongoose } = require("mongoose");
const { uploadFile } = require("../middlewares/UploadFile");
const {verifyToken, verifyByRole} =  require("../middlewares/Auth")
router
  .post("/", uploadFile, verifyToken, verifyByRole(["admin"]),async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      let img = ""
      if (req.file !== null && req.file !== undefined)
        img = req.file.filename
      const brandDTO = createBrandDto({ ...req.body, img })
      if (brandDTO.hasOwnProperty("errMessage"))
        throw new CustomError(brandDTO.errMessage, 400)

      const createdBrand = await brandService.create(brandDTO.data, session)

      await session.commitTransaction()
      res.status(201).json(createdBrand)
    } catch (error) {
      await session.abortTransaction()
      session.endSession()

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      else
        res.status(500).json({ message: "Server has something wrong!!" })
      console.error(error.toString())
    }

  })
  .put("/:id", uploadFile, async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      let img = ""
      if (req.file !== null && req.file !== undefined)
        img = req.file.filename
      const brandDTO = updateBrandDto(req.params.id, { ...req.body, img })
      if (brandDTO.hasOwnProperty("errMessage"))
        throw new CustomError(brandDTO.errMessage, 400)
      const updatedBrand = await brandService.update({ ...brandDTO.data }, session)
      await session.commitTransaction()
      res.status(201).json(updatedBrand)

    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message })
      else
        res.status(500).json({message:"Server has something wrong!!"})
      console.error(error.toString())
    }

  })

  .get("/",async (req, res) => {
    try {
      const brands = await brandService.getAll()
      return res.status(200).json(brands)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server has something wrong!!" })
    }
  })
  .delete('/:id', (req, res) => {
    brandService.deleteOne(req.params.id)
      .then(category => {
        return res.status(200).json(category);
      })
      .catch(err => {
        res.status(400).json({ message: err })
      })
  })


module.exports = { router };
