import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express ()

const db = mysql.createConnection({
    host:"smatinsurance.mysql.database.azure.com",
    user:"smat_admin",
    password:"1P@ssword",
    database:"test"
})

// Connect to the database
db.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as id', db.threadId);
});

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.price, 
        req.body.cover,
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book Has been created successfully")
    })
})

app.delete("/books/:id", (req,res)=>{
    const bookId =req.params.id
    const q = "DELETE FROM books WHERE id  = ?"

    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book Has been deleted successfully")
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId =req.params.id
    const q = "UPDATE books SET `title`  = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.price, 
        req.body.cover,
    ];
    
    db.query(q, [...values,bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book Has been updated successfully")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to Backend!")
})