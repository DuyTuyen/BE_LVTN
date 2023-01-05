const orderDetailRepo = require("../repositories/OrderDetailRepo");
const orderRepo = require("../repositories/OrderRepo");
const paymentRepo = require("../repositories/PaymentRepo");
const notificationRepo = require("../repositories/NotificationRepo")
const consignmentService = require("./ConsignmentService");
const { CustomError } = require("../errors/CustomError");
const { sendRequestMomo } = require("../utils/Momo");
const PAYMENTTYPE = require("../enums/PaymentType");
const NOTIFICATIONTYPE = require("../enums/NotificationType");
const ORDERSTATUS = require("../enums/OrderStatus");

async function create(orderDTO, session) {
  try {
    const details = orderDTO.r_orderDetails;
    const updatingQuantityConsignmentPromise = [];
    details.forEach((detail) => {
      updatingQuantityConsignmentPromise.push(
        consignmentService.updateConsignment(
          {
            r_productDetail: detail.r_productDetail,
            quantity: detail.quantity,
            size: detail.size
          },
          session
        )
      );
    });
    await Promise.all(updatingQuantityConsignmentPromise);
    const createdOrderDetails = await orderDetailRepo.createMany(
      details,
      session
    );
    const createdOrder = await orderRepo.create({
      totalBill: orderDTO.totalBill,
      address: orderDTO.address,
      name: orderDTO.name,
      phone: orderDTO.phone,
      email: orderDTO.email,
      r_user: orderDTO.r_user,
      r_orderDetails: createdOrderDetails,
    }, session);
    const createdPayment = await paymentRepo.create({
      type: orderDTO.paymenttype,
      r_order: createdOrder[0],
    }, session);
    if (orderDTO.paymentType === PAYMENTTYPE.MOMO) {
      const payUrl = await sendRequestMomo({ orderId: createdOrder[0]._id.toString(), paymentId: createdPayment[0]._id.toString(), totalBill: createdOrder[0].totalBill })

      return Promise.resolve({ payUrl, type: orderDTO.paymentType })
    }
    return Promise.resolve({ type: orderDTO.paymentType, payUrl: "/order" })
  } catch (error) {
    console.log(error)
    throw new CustomError(error.toString(), 500);
  }
}

function getAll() {
  return orderRepo.getAll()
}

function getByUserId(id) {
  return orderRepo.getByUserId(id)
}

async function updateStatus(orderDTO, session) {
  try {
    const foundOrder = await orderRepo.getById(orderDTO.id, session)
    const tempFoundOrder = foundOrder[0]
    let updatedOrder = null
    if ([ORDERSTATUS.NEW, ORDERSTATUS.SHIPPING].includes(tempFoundOrder.status) && orderDTO.status === ORDERSTATUS.FALIED) {
      updatedOrder = await orderRepo.updateStatus(orderDTO,session)
      await notificationRepo.create({
        
        type: NOTIFICATIONTYPE.FAILED_ORDER,
        r_order: tempFoundOrder._id
      }, session)
    }

    else if (ORDERSTATUS.NEW === tempFoundOrder.status && orderDTO.status === ORDERSTATUS.SHIPPING) {
      updatedOrder = await orderRepo.updateStatus(orderDTO,session)
      await notificationRepo.create({
        
        type: NOTIFICATIONTYPE.SHIPPING_ORDER,
        r_order: tempFoundOrder._id
      }, session)
    }

    else if (ORDERSTATUS.SHIPPING === tempFoundOrder.status && orderDTO.status === ORDERSTATUS.SUCCESS) {
      updatedOrder = await orderRepo.updateStatus(orderDTO,session)
      await notificationRepo.create({
        
        type: NOTIFICATIONTYPE.SUCCESS_ORDER,
        r_order: tempFoundOrder._id
      }, session)
    }

    return Promise.resolve(updatedOrder[0])
  } catch (error) {
    throw new CustomError(error.toString(), 500);
  }
}
module.exports = { create, getAll, getByUserId, updateStatus };
