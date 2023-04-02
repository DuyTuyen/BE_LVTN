const { CustomError } = require("../errors/CustomError");
const consignmentRepo = require("../repositories/ConsignmentRepo");
const notificationRepo = require("../repositories/NotificationRepo");
const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus");
const NOTIFICATIONTYPE = require("../enums/NotificationType");

function createMany(consignments, session) {
  return consignmentRepo.createMany(consignments, session);
}

async function updateConsignment(updatingConsignmentDto, session) {
  const { size, r_productDetail, quantity } = updatingConsignmentDto;
  let myQuantity = quantity;
  const foundConsignments = await consignmentRepo.findByProductDetailId(
    { r_productDetail, size },
    session
  );
  console.log(foundConsignments)
  if (
    foundConsignments.reduce((total, item) => total + item.quantity, 0) >=
    myQuantity
  ) {
    // use some to loop until myquantity equal 0
    for (const consignment of foundConsignments) {
      console.log(consignment)
      if (consignment.quantity <= myQuantity) {
        consignment.quantity = 0;
        consignment.status = CONSIGNMENTSTATUS["OUT_OF_STOCK"];
        await notificationRepo.create(
          {
            type: NOTIFICATIONTYPE.OUT_OF_STOCK,
            r_consignment: consignment._id,
          },
          session
        );
        myQuantity -= consignment.quantity;
      }
      else {
        consignment.quantity -= myQuantity;
        if (
          consignment.quantity <=
          Number(process.env.NUMBER_COMMING_OUT_OF_STOCK)
        ) {
          if (
            consignment.status !== CONSIGNMENTSTATUS["COMMING_OUT_OF_STOCK"]
          ) {
            consignment.status = CONSIGNMENTSTATUS["COMMING_OUT_OF_STOCK"];
            await notificationRepo.create(
              {
                type: NOTIFICATIONTYPE.COMMING_OUT_OF_STOCK,
                r_consignment: consignment._id,
              },
              session
            );
          }
        }
        myQuantity = 0;
      }
      await consignment.save();
      if (myQuantity == 0) break;
    }
    return Promise.resolve();
  } else {
    return Promise.reject(`số lượng hàng trong kho không đủ`);
  }
}

async function checkCommingOutOfStock(session) {
  const foundConsignments = await consignmentRepo.getStockConsignment(session);

  for (const c of foundConsignments) {
    if (c.quantity <= Number(process.env.NUMBER_COMMING_OUT_OF_STOCK)) {
      c.status = ConsignmentStatus.COMMING_OUT_OF_STOCK;
      await c.save();
      await notificationRepo.create(
        {
          type: NOTIFICATIONTYPE.COMMING_OUT_OF_STOCK,
          r_consignment: c._id,
        },
        session
      );
    }
  }
}

async function getAll() {
  return consignmentRepo.getAll();
}

async function updateStatus(consignmentDTO, session) {
  try {
    const foundConsignment = await consignmentRepo.getById(
      consignmentDTO.id,
      session
    );
    if (
      [
        CONSIGNMENTSTATUS.COMMING_OUT_OF_STOCK,
        CONSIGNMENTSTATUS.OUT_OF_STOCK,
      ].includes(foundConsignment[0].status)
    )
      return Promise.reject(
        new CustomError("Bạn không thể thay đổi trạng thái lô hàng này", 400)
      );
    else {
      const updatedConsignment = await consignmentRepo.updateStatus(
        consignmentDTO,
        session
      );
      return Promise.resolve(updatedConsignment[0]);
    }
  } catch (error) {
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}

module.exports = {
  createMany,
  updateConsignment,
  checkCommingOutOfStock,
  getAll,
  updateStatus,
};
