const NOTIFICATIONTYPE = require("../enums/NotificationType")
module.exports = () => {
    const aggregate = [
        {
            $match: {
                active: true,
                type: NOTIFICATIONTYPE.COMMING_OUT_OF_STOCK
            }
        },
        {
            $lookup: {
                from: "consignments",
                localField: "r_consignment",
                foreignField: "_id",
                as: "r_consignment",
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
                                    $unwind: { path: "$r_product" }
                                },
                                {
                                    $project: {
                                        _id: 1,
                                        img: 1,
                                        color: 1,
                                        "r_product._id": 1,
                                        "r_product.name": 1
                                    }
                                }
                            ],
                        },
                    },
                    {
                        $unwind: { path: "$r_productDetail" }
                    }
                ]
            }
        },
        {
            $unwind: { path: "$r_consignment" }
        },
        {
            $sort: {
                "createdAt": 1,
            }
        },
    ]
    return aggregate
}

