const { Router } = require("express");
const router = Router({ mergeParams: true });

const { router: categoryRouter } = require("./CategoryRoute");
const { router: brandRouter } = require("./BrandRoute");
const { router: userRouter } = require("./UserRoute");
const { router: rateRouter } = require("./RateRoute");
const { router: productRouter } = require("./ProductRoute");
const { router: productDetailRouter } = require("./ProductDetailRoute");

router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/user", userRouter);
router.use("/rate", rateRouter);
router.use("/product", productRouter);
router.use("/productdetail", productDetailRouter);

module.exports = router;
