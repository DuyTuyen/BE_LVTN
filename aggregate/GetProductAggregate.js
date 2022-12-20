const CONSIGNMENTSTATUS = require("../enums/ConsignmentStatus")
module.exports = (filter) => {
    const aggregate = [
        {
            $lookup: {
                from: "categories",
                localField: "r_category",
                foreignField: "_id",
                as: "r_category",
            },
        },
        {
            $unwind: { path: "$r_category" },
        },
        {
            $lookup: {
                from: "brands",
                localField: "r_brand",
                foreignField: "_id",
                as: "r_brand",
            },
        },
        {
            $unwind: { path: "$r_brand" },
        },
        {
            $lookup: {
                from: "productdetails",
                localField: "r_productDetails",
                foreignField: "_id",
                as: "r_productDetails",
                pipeline: [
                    {
                        $lookup: {
                            from: "consignments",
                            localField: "_id",
                            foreignField: "r_productDetail",
                            as: "r_consignments",
                            pipeline: [
                                {
                                    $match: {
                                        status: {
                                            $in: [CONSIGNMENTSTATUS.IN_STOCK, CONSIGNMENTSTATUS.COMMING_OUT_OF_STOCK]
                                        }
                                    }
                                },
                                {
                                    $group: {
                                        "_id": "$size",
                                        "size": { $first: "$size" },
                                        "quantity": { $sum: '$quantity' },
                                    },

                                },
                            ]
                        },
                    },
                    {
                        $match: {
                            'r_consignments.0': {
                                $exists: true
                            },
                        }
                    },
                    {
                        $project: {
                            "color": 1,
                            "img": 1,
                            "r_consignments.size": 1,
                            "r_consignments.quantity": 1
                        }
                    }
                ],
            },
        },
        {
            $match: {
                active: true,
                "r_productDetails.0": {
                    $exists: true
                },
                ...filter
            }
        }
    ]
    return aggregate
}