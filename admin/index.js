const express = require("express")
const path = require("path")
const morgan = require("morgan")
const port = 4002
var app = express()


app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname + "/public")))

app.use(morgan("dev"))

app.get("/", (req, res) => {
    return res.render("index")
})

app.get("/login", (req, res) => {
    return res.render("login")
})
app.get("/forgot", (req, res) => {
    return res.render("forgot")
})
app.get("/sign-up", (req, res) => {
    return res.render("sign-up")
})
app.get("/table", (req, res) => {
    return res.render("tables")
})
app.get("/food", (req, res) => {
    return res.render("food")
})
app.get("/customizefood", (req, res) => {
    return res.render("customizefood")
})


app.listen(port, () => { console.log(`app running on http://localhost:${port}`) })