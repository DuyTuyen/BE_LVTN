const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus")
module.exports = (filter) => {
    const aggregate = [
        {
            $lookup: {
                from: "importorderdetails",
                localField: "r_importOrderDetails",
                foreignField: "_id",
                as: "r_importOrderDetails",
                pipeline: [
                    {
                        $lookup: {
                            from: "productdetails",
                            localField: "r_productDetail",
                            foreignField: "_id",
                            as: "r_productDetail",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "_id",
                                        foreignField: "r_productDetails",
                                        as: "r_product"
                                    },
                                },
                                {
                                    $unwind: {path: "$r_product"}
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        img: 1,
                                        color: 1,
                                        "r_product.name": 1
                                    }
                                }
                            ],
                        },
                    },
                    {
                        $unwind: {path: "$r_productDetail"}
                    }
                ]
            },
        },
        {
            $match: {
                active: true,
                ...filter
            }
        },
    ]
    return aggregate
}