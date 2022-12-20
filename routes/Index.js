const { Router } = require("express");
const router = Router({ mergeParams: true });

const { router: categoryRouter } = require("./CategoryRoute");
const { router: brandRouter } = require("./BrandRoute");
const { router: userRouter } = require("./UserRoute");
const { router: rateRouter } = require("./RateRoute");
const { router: productRouter } = require("./ProductRoute");
const { router: productDetailRouter } = require("./ProductDetailRoute");
const { router: importOrderRouter } = require("./ImportOrderRoute");
const { router: orderRouter } = require("./OrderRoute");
const { router: momoRouter } = require("./MomoRoute");

router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/user", userRouter);
router.use("/rate", rateRouter);
router.use("/product", productRouter);
router.use("/productdetail", productDetailRouter);
router.use("/importorder", importOrderRouter);
router.use("/order", orderRouter);
router.use("/momo", momoRouter);

module.exports = router;
