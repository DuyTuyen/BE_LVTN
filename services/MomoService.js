const orderRepo = require("../repositories/OrderRepo");
const paymentRepo = require("../repositories/PaymentRepo");
const { CustomError } = require("../errors/CustomError");
const ORDERSTATUS = require("../enums/OrderStatus")
const PAYMENTSTATUS = require("../enums/PaymentStatus")

async function updateOrderAndPaymentStatus({orderId, paymentId, momoId}, session) {
  try {
    await orderRepo.updateStatus({id: orderId, status: ORDERSTATUS.SHIPPING, isPaid: true},session)
    await paymentRepo.updateStatus({id: paymentId, status: PAYMENTSTATUS.PAID, momoId},session)
    return Promise.resolve()
  } 
  catch (error) {
    throw new CustomError(error.toString(), 500);
  }
}

module.exports = { updateOrderAndPaymentStatus };
