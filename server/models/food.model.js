const mongoose = require("mongoose")
const Schema = mongoose.Schema

const foodSchema = new Schema({
    foodname: {
        type: String,
        required: true
    },
    foodid: {
        type: String,
    },
    foodimage: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerprice: {
        type: Number,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    stock: {
        type: Boolean,
        default: true
    },
    foodtype: {
        type: String,
        default: true
    },
    date: {
        type: String,
    },
    iscustomize: {
        type: Boolean,
        default: false
    }

})

const food = mongoose.model("food", foodSchema)
module.exports = food