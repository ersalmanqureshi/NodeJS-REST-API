const express = require("express")
const app = express()

//ping server on localhost:3003
app.listen("3003", () => {
    console.log("Server is up and listening 3003");
})

app.get("/", (req, res) => {
    console.log("Responding to route");
    res.send("Hello from root")
})