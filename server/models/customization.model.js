const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customizationSchema = new Schema({
    customizationdata: {
        type: Array,
        required: true
    },
    foodid: {
        type: String,
    },
    customizationid: {
        type: String,
    },
    date: {
        type: String,
    }
})

const customization = mongoose.model("customization", customizationSchema)
module.exports = customization