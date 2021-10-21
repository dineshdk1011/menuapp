const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    table: {
        type: String,
        required: true
    },
    cartid: {
        type: String,        
    },
    foodid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    date: {
        type: String,
    }
})

const cart = mongoose.model("cart", cartSchema)
module.exports = cart