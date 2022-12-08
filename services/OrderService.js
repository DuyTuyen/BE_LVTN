const exportOrderDetailRepo = require("../repositories/ExportOrderDetailRepo");
const exportOrderRepo = require("../repositories/ExportOrderRepo");
const paymentRepo = require("../repositories/PaymentRepo");
const consignmentService = require("./ConsignmentService");
const { CustomError } = require("../errors/CustomError");

async function create(exportOrderDTO, session) {
  try {
    const details = exportOrderDTO.r_exportOrderDetails;
    const updatingQuantityConsignmentPromise = [];
    details.forEach((detail) => {
      updatingQuantityConsignmentPromise.push(
        consignmentService.updateConsignment(
          {
            r_productDetail: detail.r_productDetail,
            quantity: detail.quantity,
          },
          session
        )
      );
    });
    console.log(exportOrderDTO);
    await Promise.all(updatingQuantityConsignmentPromise);
    const createdExportOrderDetails = await exportOrderDetailRepo.createMany(
      details,
      session
    );
    const createdExportOrder = await exportOrderRepo.create({
      totalBill: exportOrderDTO.totalBill,
      r_user: exportOrderDTO.r_user,
      address: exportOrderDTO.address,
      name: exportOrderDTO.name,
      phone: exportOrderDTO.phone,
      email: exportOrderDTO.email,
      r_exportOrderDetails: createdExportOrderDetails,
    });
    await paymentRepo.create({
      type: exportOrderDTO.paymenttype,
      r_exportOrder: createdExportOrder[0],
    });
    return Promise.resolve(createdExportOrder);
  } catch (error) {
    throw new CustomError(error.toString(), 500);
  }
}

module.exports = { create };
