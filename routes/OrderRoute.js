const { Router } = require("express");
const router = Router({ mergeParams: true });

const { CustomError } = require("../errors/CustomError");
const orderService = require("../services/OrderService");
const { createOrderDto, updateOrderDto, updatePaymentStatusDto } = require("../dtos/OrderDTO");

const { default: mongoose } = require("mongoose");
const { verifyToken } = require("../middlewares/Auth");

router
  .post("/", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const orderDTO = createOrderDto(req.body);
      if (orderDTO.hasOwnProperty("errMessage"))
        throw new CustomError(orderDTO.errMessage, 400);
      orderDTO.data["r_user"] = req.user.id;
      const createdOrder = await orderService.create(orderDTO.data, session);
      await session.commitTransaction();
      res.status(201).json(createdOrder);
    } catch (error) {
      console.log(error);
      await session.abortTransaction();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
    } finally {
      session.endSession();
    }
  })

  .get("/", async (req, res) => {
    try {
      const foundOrders = await orderService.getAll();
      return res.status(200).json(foundOrders);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  })

  .put("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const orderDTO = updateOrderDto({ ...req.body, id: req.params.id });
      if (orderDTO.hasOwnProperty("errMessage"))
        throw new CustomError(orderDTO.errMessage, 400);
      const createdOrder = await orderService.updateStatus(
        orderDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(200).json(createdOrder);
    } catch (error) {
      console.log(error);
      await session.abortTransaction();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
    } finally {
      session.endSession();
    }
  })

  .put("/payment-status/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const orderDTO = updatePaymentStatusDto( req.params.id );
      if (orderDTO.hasOwnProperty("errMessage"))
        throw new CustomError(orderDTO.errMessage, 400);
      const updatedOrder = await orderService.updatePaymentStatus(
        orderDTO.data.id,
        session
      );
      await session.commitTransaction();
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error);
      await session.abortTransaction();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
    } finally {
      session.endSession();
    }
  })

  .get("/byUser", verifyToken, async (req, res) => {
    try {
      const foundOrders = await orderService.getByUserId(req.user.id);
      return res.status(200).json(foundOrders);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  });

module.exports = { router };
