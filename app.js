const express = require("express")
const app = express()
const morgan = require("morgan")
const mysql = require("mysql")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))

const router = require('./routes/user.js')

app.use(router)

app.use(morgan("short"))

app.use(express.static('./public'))

const PORT = process.env.PORT || 3003

//ping server on localhost:3003
app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT);
})

app.get("/", (req, res) => {
    console.log("Responding to route");
    res.send("Hello from Root")
})