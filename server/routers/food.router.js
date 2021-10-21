const router = require("express").Router()
const Food = require("../models/food.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const allFood = await Food.find({}).then((res) => res).catch((err) => err.message)
    return res.send(allFood)
})

router.post("/", async (req, res) => {
    const newFood = req.body
    newFood["foodid"]=Date.now().toString()
    newFood["date"]=moment().format()
    const food = await new Food(newFood).save().then((res) => res).catch((err) => err.message)
    return res.send(food)
})

router.get("/:foodid", async (req, res) => {
    const {foodid}=req.params
    const food = await Food.find({ foodid: foodid }).then((res) => res).catch((err) => err.message)
    return res.send(food)
})

router.put("/:foodid", async (req, res) => {
    const {foodid}=req.params
    const updateFood = req.body
    const food = await Food.updateOne({ foodid: foodid }, { $set: updateFood }).then((res) => res).catch((err) => err.message)
    return res.send(food)
})

router.delete("/:foodid", async (req, res) => {
    const {foodid}=req.params
    const food = await Food.deleteOne({ foodid: foodid }).then((res) => res).catch((err) => err.message)
    return res.send(food)
})

module.exports = router