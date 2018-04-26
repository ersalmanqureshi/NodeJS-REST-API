const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan("combined"))

//ping server on localhost:3003
app.listen("3003", () => {
    console.log("Server is up and listening 3003");
})

app.get("/", (req, res) => {
    console.log("Responding to route");
    res.send("Hello from root")
})

app.get("/users", (req, res) => {
    console.log("Nodemon")
    var user1 = {firstName: "Salman", lastName: "Qureshi"}
    const user2 = {firstName: "Sharukh", lastName: "Qureshi"}
    res.json([user1, user2])
    //res.send("Hello Nodemon")
})