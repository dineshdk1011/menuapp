const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    // phone: {
    //     type: String,
    // },
    userid: {
        type: String,
    },
    table: {
        type: String,
    },
    date: {
        type: String,
    }
})

const user = mongoose.model("user", userSchema)
module.exports = user