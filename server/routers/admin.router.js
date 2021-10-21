const router = require("express").Router()
const Admin = require("../models/admin.model")
const moment = require("moment")

router.get("/", async (req, res) => {
    const alladmin = await Admin.find({}).then((res) => res).catch((err) => err.message)
    return res.send(alladmin)
})

router.post("/", async (req, res) => {
    const newadmin = req.body
    newadmin["adminid"]=Date.now().toString()
    const admin = await new Admin(newadmin).save().then((res) => res).catch((err) => err.message)
    return res.send(admin)
})


module.exports = router