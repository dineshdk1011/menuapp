const router = require("express").Router()
const User = require("../models/user.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const allCategory = await User.find({}).then((res) => res).catch((err) => err.message)
    return res.send(allCategory)
})

router.post("/", async (req, res) => {
    const newUser = req.body
    newUser["userid"]=Date.now().toString()
    newUser["date"]=moment().format()
    const user = await new User(newUser).save().then((res) => res).catch((err) => err.message)
    return res.send(user)
})

router.get("/:userid", async (req, res) => {
    const {userid}=req.params
    const user = await User.find({ userid: userid }).then((res) => res).catch((err) => err.message)
    return res.send(user)
})

router.put("/:userid", async (req, res) => {
    const {userid}=req.params
    const updateuser = req.body
    const user = await User.updateOne({ userid: userid }, { $set: updateuser }).then((res) => res).catch((err) => err.message)
    return res.send(user)
})

router.delete("/:userid", async (req, res) => {
    const {userid}=req.params
    const user = await User.deleteOne({ userid: userid }).then((res) => res).catch((err) => err.message)
    return res.send(user)
})

module.exports = router