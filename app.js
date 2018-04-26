const express = require("express")
const app = express()
const morgan = require("morgan")
const mysql = require("mysql")

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

app.get("/user/:id", (req, res) => {
    console.log("Fetching user with id:", req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'isalman_mysql_db'
    })

    const queryString = "SELECT * FROM users WHERE id = ?"

    connection.query(queryString, [req.params.id] , (err, results, fields) => {

        if (err) {
            console.log("Failed to search for user: ", err);
            res.sendStatus(500)
            return

            //throw err
        }

        console.log("Fetch users successfully");

        var users = results.map((result) => {
            return { firstName: result.first_name, lastName: result.last_name}
        })

        res.json(users)  
    })

    //res.end()
})