const router = require("express").Router()
const Category = require("../models/category.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const allCategory = await Category.find({}).then((res) => res).catch((err) => err.message)
    return res.send(allCategory)
})

router.post("/", async (req, res) => {
    const newCategory = req.body
    newCategory["categorid"]=Date.now().toString()
    newCategory["date"]=moment().format()
    const category = await new Category(newCategory).save().then((res) => res).catch((err) => err.message)
    return res.send(category)
})

router.get("/:categorid", async (req, res) => {
    const {categorid}=req.params
    const category = await Category.find({ categorid: categorid }).then((res) => res).catch((err) => err.message)
    return res.send(category)
})

router.put("/:categorid", async (req, res) => {
    const {categorid}=req.params
    const updateCategory = req.body
    const category = await Category.updateOne({ categorid: categorid }, { $set: updateCategory }).then((res) => res).catch((err) => err.message)
    return res.send(category)
})

router.delete("/:categorid", async (req, res) => {
    const {categorid}=req.params
    const category = await Category.deleteOne({ categorid: categorid }).then((res) => res).catch((err) => err.message)
    return res.send(category)
})

module.exports = router