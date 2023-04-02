const orderRepo = require("../repositories/OrderRepo");
const paymentRepo = require("../repositories/PaymentRepo");
const { CustomError } = require("../errors/CustomError");
const ORDERSTATUS = require("../enums/OrderStatus")
const PAYMENTSTATUS = require("../enums/PaymentStatus")
const notificationRepo = require("../repositories/NotificationRepo");
const NotificationType = require("../enums/NotificationType");
async function updateOrderAndPaymentStatus({orderId, paymentId, momoId}, session) {
  try {
    const updatedOrder = await orderRepo.updateStatus({id: orderId, status: ORDERSTATUS.SHIPPING, isPaid: true},session)
    await paymentRepo.updateStatus({ id: paymentId, status: PAYMENTSTATUS.PAID, momoId }, session)
    await notificationRepo.create({type: NotificationType.SHIPPING_ORDER, r_order: updatedOrder[0]._id})
    return Promise.resolve()
  } 
  catch (error) {
    throw new CustomError(error.toString(), 500);
  }
}

module.exports = { updateOrderAndPaymentStatus };
