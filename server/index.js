const express = require("express")
const morgan = require("morgan")
const path = require("path")
const cors = require("cors")
const env = require("dotenv").config({ path: path.resolve(__dirname, "./.env") })
const port = process.env.PORT || 4001
var app = express()

//databse init
require("./database")

//body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//morgan middleware
app.use(morgan("dev"))

//cors config


var whitelist = ['http://localhost:4000', 'http://localhost:4002']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}
// app.use(cors(corsOptionsDelegate))
app.use(cors())

//api
app.use(require("./routers"))

app.listen(port, () => { console.log(`App Running On http://localhost:${port}`) })
