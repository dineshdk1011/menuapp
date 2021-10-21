const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tableSchema = new Schema({
    tablename: {
        type: String,
        required: true
    },
    tableid: {
        type: String,
    },
    qrcode: {
        type: String
    },
    date: {
        type: String,
    }
})

const table = mongoose.model("table", tableSchema)
module.exports = table