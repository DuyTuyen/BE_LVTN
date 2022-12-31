const orderRepo = require("../repositories/OrderRepo")
const orderDetailRepo = require("../repositories/OrderDetailRepo")
const importOrderRepo = require("../repositories/ImportOrderRepo");
const consignmentRepo = require("../repositories/ConsignmentRepo");
const { getMonthAndYear, getNowYear } = require("../utils/Moment");
const { CustomError } = require("../errors/CustomError");

async function getRevenue() {
    try {
        const revenue = { InThePast: 0, Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 }
        const costPrice = { InThePast: 0, Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 }
        const gap = { InThePast: 0, Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 }

        const foundOrders = await orderRepo.getAll();
        const foundImportOrders = await importOrderRepo.getAll()
    
        foundOrders.forEach(order => {
            const { month, year } = getMonthAndYear(order.createdAt)
            const nowYear = getNowYear()
    
            if (year !== nowYear){
                revenue.thepast += order.totalBill
                gap.thepast += order.totalBill
            }
            else {
                revenue[month] += order.totalBill
                gap[month] += order.totalBill
            }
        })
    
        foundImportOrders.forEach(order => {
            const { month, year } = getMonthAndYear(order.importedAt)
            const nowYear = getNowYear()
    
            if (year !== nowYear){
                costPrice.thepast += order.totalPrice
                gap.thepast -= order.totalPrice
            }
            else {
                costPrice[month] += order.totalPrice
                gap[month] -= order.totalPrice
            }
        })
        return Promise.resolve({revenue,costPrice,gap})
    } catch (error) {
        throw new CustomError(error.toString(),500)
    }
}

async function getTopSoldProducts() {
    try {
        const stockProducts = await consignmentRepo.groupByProduct()
        let topSoldProducts = await orderDetailRepo.groupAndGetTopSoldProduct()

        topSoldProducts = topSoldProducts.map(t => {
            const found = stockProducts.find(s => s.r_product._id.toString() === t.r_product._id.toString())
            return {
                ...t,
                stockQuantity: found? found.quantity : 0
            }
        })
        return Promise.resolve(topSoldProducts)
    } catch (error) {
        throw new CustomError(error.toString(),500)
    }
}


module.exports = {getRevenue, getTopSoldProducts};
