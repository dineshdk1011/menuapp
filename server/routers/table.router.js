const router = require("express").Router()
const Table = require("../models/table.model")
const moment = require("moment")
const { qrCode } = require("../helpers/qrcode")

router.get("/", async (req, res) => {
    const alltable = await Table.find({}).then((res) => res).catch((err) => err.message)
    return res.send(alltable)
})

router.post("/", async (req, res) => {
    const newTable = req.body
    newTable["tableid"] = Date.now().toString()
    newTable["date"] = moment().format()
    const qrData = `http://localhost:4000/register?table=${newTable.tablename}`
    var tableqrcode = await qrCode(qrData)
    newTable["qrcode"] = tableqrcode
    const table = await new Table(newTable).save().then((res) => res).catch((err) => err.message)
    return res.send(table)
})

router.get("/:tableid", async (req, res) => {
    const { tableid } = req.params
    const table = await Table.find({ tableid: tableid }).then((res) => res).catch((err) => err.message)
    return res.send(table)
})

router.put("/:tableid", async (req, res) => {
    const { tableid } = req.params
    const updateTable = req.body
    const table = await Table.updateOne({ tableid: tableid }, { $set: updateTable }).then((res) => res).catch((err) => err.message)
    return res.send(table)
})

router.delete("/:tableid", async (req, res) => {
    const { tableid } = req.params
    const table = await Table.deleteOne({ tableid: tableid }).then((res) => res).catch((err) => err.message)
    return res.send(table)
})

module.exports = router