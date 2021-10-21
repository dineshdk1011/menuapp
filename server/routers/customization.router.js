const router = require("express").Router()
const Customization = require("../models/customization.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const allCustomization = await Customization.find({}).then((res) => res).catch((err) => err.message)
    return res.send(allCustomization)
})

router.post("/", async (req, res) => {
    const newCustomization = req.body
    console.log(newCustomization)
    newCustomization["customizationid"]=Date.now().toString()
    newCustomization["date"]=moment().format()
    const customization = await new Customization(newCustomization).save().then((res) => res).catch((err) => err.message)
    return res.send(customization)
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

router.delete("/:customizationid", async (req, res) => {
    const {customizationid}=req.params
    console.log(customizationid)
    const customization = await Customization.deleteOne({ customizationid: customizationid }).then((res) => res).catch((err) => err.message)
    return res.send(customization)
})

module.exports = router