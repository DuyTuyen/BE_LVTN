const { Router } = require("express");
const router = Router({ mergeParams: true });
const productService = require("../services/productService");
const { createProductDto, updateProductDto, getProductByIdDto, productFilterDto } = require("../dtos/productDTO");
const { CustomError } = require("../errors/CustomError");


const { default: mongoose } = require("mongoose");

router
  .post("/", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const productDTO = createProductDto({ ...req.body });
      if (productDTO.hasOwnProperty("errMessage"))
        throw new CustomError(productDTO.errMessage, 400);
      const createdproduct = await productService.create(
        { ...productDTO.data },
        session
      );

      await session.commitTransaction();
      res.status(201).json(createdproduct);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({message:"Server has something wrong!!"});
      console.error(error.toString());
    }
  })

  .put("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const productDTO = updateProductDto({ ...req.body, id: req.params.id });
      if (productDTO.hasOwnProperty("errMessage"))
        throw new CustomError(productDTO.errMessage, 400);
      const updatedproduct = await productService.update(
        { ...productDTO.data },
        session
      );

      await session.commitTransaction();
      res.status(201).json(updatedproduct);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({message:"Server has something wrong!!"});
      console.error(error.toString());
    }
  })

  .delete("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const productDTO = updateProductDto({ ...req.body, id: req.params.id });
      if (productDTO.hasOwnProperty("errMessage"))
        throw new CustomError(productDTO.errMessage, 400);
      await productService.deleteOne(
        productDTO.data.id,
        session
      );

      await session.commitTransaction();
      res.status(201).json();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({message:"Server has something wrong!!"});
      console.error(error.toString());
    }
  })

  .get("/", async (req, res) => {
    try {
      const filter = productFilterDto(req.query)
      const products = await productService.getAll(filter);
      return res.status(200).json(products);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  })

  .get("/admin", async (req, res) => {
    try {
      const filter = productFilterDto(req.query)
      const products = await productService.getAllAdminSide(filter);
      return res.status(200).json(products);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  })

  .get("/:id", async (req, res) => {
    try {
      const productDTO = getProductByIdDto(req.params.id);
      if (productDTO.hasOwnProperty("errMessage"))
        throw new CustomError(productDTO.errMessage, 400);
      const foundProduct = await productService.getProductById(
        productDTO.data.id,
      );
      res.status(201).json(foundProduct[0]);
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({message:"Server has something wrong!!"});
    }
  })

module.exports = { router };
