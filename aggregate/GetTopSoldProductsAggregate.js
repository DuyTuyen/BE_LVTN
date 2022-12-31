const { getNowMonth } = require("../utils/Moment")

module.exports = (month) => {
    const aggregate = [
        {
            $match: {
                active: true,
                $expr: { 
                    $eq: [getNowMonth(), { $month: "$createdAt" }] 
                }
            }
        },
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
                            "r_product.name": 1,
                            "r_product._id": 1
                        }
                    }
                ],
            },
        },
        {
            $unwind: { path: "$r_productDetail" }
        },
        {
            $group: {
                _id: {
                    "month": {
                        $month: "$createdAt"
                    },
                    "r_product": "$r_productDetail.r_product._id",
                },
                "r_product": { $first: "$r_productDetail.r_product" },
                "quantity": { $sum: '$quantity' },
            }
        },
        {
            $project: {
                _id: 0,
                r_product: 1,
                quantity: 1
            }
        },
        {
            $sort: {
                quantity: -1
            }
        },
    ]
    return aggregate
}