const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    categorid: {
        type: String,
    },
    date: {
        type: String,
    }
})

const category = mongoose.model("category", categorySchema)
module.exports = category