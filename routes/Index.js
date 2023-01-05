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
const { router: statisticRouter } = require("./StatictisRoute");
const { router: notificataionRouter } = require("./NotificationRoute");
const { router: consignmentRouter } = require("./ConsignmentRoute");
const { router: permissionRouter } = require("./PermissionRoute");
const { router: roleRouter } = require("./RoleRoute");
const { router: protectedRouter } = require("./ProtectedRoute");

router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/user", userRouter);
router.use("/rate", rateRouter);
router.use("/product", productRouter);
router.use("/productdetail", productDetailRouter);
router.use("/importorder", importOrderRouter);
router.use("/order", orderRouter);
router.use("/momo", momoRouter);
router.use("/statistic", statisticRouter);
router.use("/notification", notificataionRouter);
router.use("/consignment", consignmentRouter);
router.use("/permission", permissionRouter);
router.use("/role", roleRouter);
router.use("/protected", protectedRouter);

module.exports = router;
