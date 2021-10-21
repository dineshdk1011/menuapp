const mongoose = require("mongoose")

const mongoseURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@alphazenecluster.ma5ln.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(mongoseURL, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log(`${process.env.MONGODB_DATABASE} Database Connected!...`)
    }
})

module.exports = mongoose