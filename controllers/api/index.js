const router = require("express").Router();
const userRoutes = require("./userRoutes");
const providerInfoRoutes = require("./providerInfoRoutes");
const reviewRoutes = require("./reviewRoutes");
router.use("/users", userRoutes);
router.use("/providers", providerInfoRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
