const router = require("express").Router()

router.use("/user", require("./user.router"))
router.use("/cart", require("./cart.router"))
router.use("/food", require("./food.router"))
router.use("/category", require("./category.router"))
router.use("/order", require("./order.router"))
router.use("/table", require("./table.router"))
router.use("/admin", require("./admin.router"))
router.use("/customization", require("./customization.router"))

module.exports = router


