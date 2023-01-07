const { default: mongoose } = require("mongoose")
const NOTIFICATIONTYPE = require("../enums/NotificationType")
module.exports = (userId) => {
    const aggregate = [
        {
            $match: {
                active: true,
                type: {
                    $in: [NOTIFICATIONTYPE.FAILED_ORDER, NOTIFICATIONTYPE.SHIPPING_ORDER, NOTIFICATIONTYPE.SUCCESS_ORDER]
                }
            }
        },
        {
            $lookup: {
                from: "orders",
                localField: "r_order",
                foreignField: "_id",
                as: "r_order",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "r_user",
                            foreignField: "_id",
                            as: "r_user",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        name: 1,                                    
                                    }
                                },
                            ],
                        },
                    },
                    {
                        $unwind: { path: "$r_user" }
                    },
                    {
                        $lookup: {
                            from: "orderdetails",
                            localField: "r_orderDetails",
                            foreignField: "_id",
                            as: "r_orderDetails",
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
                                    $unwind: "$r_productDetail"
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            $unwind: { path: "$r_order" }
        },
        {
            $match: {
                "r_order.r_user._id": mongoose.Types.ObjectId(userId)
            }
        },
        {
            $sort: {
                "createdAt": 1,
            }
        },
    ]
    return aggregate
}

