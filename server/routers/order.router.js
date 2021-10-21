const router = require("express").Router()
const Order = require("../models/order.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const allOrder = await Order.find({}).then((res) => res).catch((err) => err.message)
    return res.send(allOrder)
})

router.post("/", async (req, res) => {
    const updateOrder = req.body
    updateOrder["orderid"] = Date.now().toString()
    updateOrder["date"] = moment().format()
    const order = await new Order(updateOrder).save().then((res) => res).catch((err) => err.message)
    return res.send(order)
})

router.get("/:orderid", async (req, res) => {
    const { orderid } = req.params
    const order = await Order.find({ orderid: orderid }).then((res) => res).catch((err) => err.message)
    return res.send(order)
})

router.patch("/:userid", async (req, res) => {
    const { userid } = req.params
    const order = await Order.find({ userid: userid }).then((res) => res).catch((err) => err.message)
    return res.send(order)
})

router.put("/:orderid", async (req, res) => {
    const { orderid } = req.params
    const neworder = req.body
    const order = await Order.updateOne({ orderid: orderid }, { $set: neworder }).then((res) => res).catch((err) => err.message)
    return res.send(order)
})

router.delete("/:orderid", async (req, res) => {
    const { orderid } = req.params
    const order = await Order.deleteOne({ orderid: orderid }).then((res) => res).catch((err) => err.message)
    return res.send(order)
})

module.exports = router