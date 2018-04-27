const express = require("express")
const mysql = require("mysql")
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'isalman_mysql_db'
})

function getConnection() {
    return pool
}

router.get("/messages", (req, res) => {
    console.log("Showing messages");
    res.end()
})

router.get("/users", (req, res) => {

    const connection = getConnection()
    const queryString = "SELECT * FROM users"

    connection.query(queryString, (err, results, fields) => {

        if (err) {
            console.log("Failed to search for user: ", err);
            res.sendStatus(500)
            return
            //throw err
        }

        console.log("Fetch users successfully");

        res.json(results)  
    })
})

router.post("/user_create", (req, res) => {
    console.log("Create a new user");
    
    const connection = getConnection()
    const queryString = "INSERT INTO users (first_name, last_name) VALUES (? , ?)"
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    console.log("FirstName: " + firstName);
    console.log("LastName: " + lastName);

    connection.query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Failed to create a new user: " + err);
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: " + results.insertId);
        
        res.end()
    })

    //res.end()
})

router.get("/user/:id", (req, res) => {
    console.log("Fetching user with id:", req.params.id)

    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"

    connection.query(queryString, [userId] , (err, results, fields) => {

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

module.exports = router