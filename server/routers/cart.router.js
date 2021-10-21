const router = require("express").Router()
const Cart = require("../models/cart.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const allCategory = await Cart.find({}).then((res) => res).catch((err) => err.message)
    return res.send(allCategory)
})

router.post("/", async (req, res) => {
    const newCart = req.body
    newCart["cartid"]=Date.now().toString()
    newCart["date"]=moment().format()
    const cart = await new Cart(newCart).save().then((res) => res).catch((err) => err.message)
    return res.send(cart)
})

router.get("/:cartid", async (req, res) => {
    const {cartid}=req.params
    const cart = await Cart.find({ cartid: cartid }).then((res) => res).catch((err) => err.message)
    return res.send(cart)
})

router.patch("/:userid", async (req, res) => {
    const {userid}=req.params
    const cart = await Cart.find({ userid: userid }).then((res) => res).catch((err) => err.message)
    return res.send(cart)
})

router.put("/:cartid", async (req, res) => {
    const {cartid}=req.params
    const updatecart = req.body
    const cart = await Cart.updateOne({ cartid: cartid }, { $set: updatecart }).then((res) => res).catch((err) => err.message)
    return res.send(cart)
})

router.delete("/:cartid", async (req, res) => {
    const {cartid}=req.params
    const cart = await Cart.deleteOne({ cartid: cartid }).then((res) => res).catch((err) => err.message)
    return res.send(cart)
})

module.exports = router