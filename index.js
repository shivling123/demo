const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Shiv@123",
  database: "classicmodels",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM stud";
  db.query(sqlSelect, (err, result) => {
    //console.log(result);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const fname = req.body.fname;
  const rollno = req.body.rollno;
  const sqlInsert = "Insert INTO stud (fname, rollno) VALUES (?,?)";
  db.query(sqlInsert, [fname, rollno], (err, result) => {
    res.send(result);
  });
});

// delete
app.delete("/api/delete/:rollno", (req, res) => {
  const roll = req.params.rollno;
  const sqlDelete = "DELETE FROM stud WHERE rollno = ?";
  db.query(sqlDelete, roll, (err, result) => {
    if (err) console.log(err);
  });
});

//update data

// update data
app.put("/api/update/", (req, res) => {
  const fname = req.body.fname;
  const rollno = req.body.rollno;
  const sqlUpdate = "UPDATE  stud SET fname = ? WHERE rollno = ?";
  db.query(sqlUpdate, [fname, rollno], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(2002, () => {
  console.log("server runnig on port 2002 ok succesfully");
});
