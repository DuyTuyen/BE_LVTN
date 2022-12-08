const productDetailRepo = require('../repositories/ProductDetailRepo')
const productRepo = require('../repositories/ProductRepo')
const { CustomError } = require('../errors/CustomError')

async function create(productDetailDetailDTO, session){
    try {
        const createdProductDetail = await productDetailRepo.create(productDetailDetailDTO, session)
        await productRepo.pushOneProductDetail({id: productDetailDetailDTO.r_product, r_productDetail: createdProductDetail},session)
        return Promise.resolve(createdProductDetail)
    } catch (error) {
        (error)
        throw new CustomError(error.toString(),500)
    }
}

module.exports = {create}