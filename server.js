
const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")
const app = express()
app.use(BodyParser.urlencoded({ extended: true }))
//connect index
app.set("view engine", "ejs")
app.set("views", "views")
//connect database
const db = mysql.createConnection({
    host: "localhost",
    database: "money",
    user: "root",
    passworld: "",
})
db.connect((err)=>{
    if(err) throw err
    console.log("database connected...")
 //output list
    app.get("/", (req, res)=>{
        const sql = "SELECT * FROM user" 
        db.query(sql, (err, result)=>{
            const users = JSON.parse(JSON.stringify(result))
            res.render("index", {users: users, title:"Catatan Duet"})
        })
    })
 //output form
    app.post("/tambah", (req, res)=>{
        const insertSql = `INSERT INTO user (date, hari, pemasukan, pengeluaran, tabungan, total) VALUES('${req.body.date}', '${req.body.hari}', '${req.body.pemasukan}', '${req.body.pengeluaran}', '${req.body.tabungan}','${req.body.total}' );`
        db.query(insertSql, (err, result)=>{
            if (err) throw err
            res.redirect("/");
        })
    })

})
//server
app.listen(3000, ()=>{
    console.log("server ready...")
})