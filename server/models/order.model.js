const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    foodid: {
        type: String,
        required: true
    },
    orderid: {
        type: String,
    },
    userid: {
        type: String,
        required: true
    },
    foodname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    costomize: {
        type: Array
    },
    amount: {
        type: Number,
        required: true
    },
    table: {
        type: String,
        required: true
    },
    date: {
        type: String,
    }
})

const order = mongoose.model("order", orderSchema)
module.exports = order