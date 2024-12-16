const express = require("express");
const port = 1111;

const app = express();
let students = [
  { id: "1", name: "aa", subejct: "a123" },
  { id: "2", name: "bb", subejct: "b123" },
  { id: "3", name: "cc", subejct: "c123" },
  { id: "4", name: "dd", subejct: "d123" },
];


app.set("view engine", "ejs");
app.use(express.urlencoded()); 


app.get("/", (req, res) => {
  res.render("index", { students });
});


app.post("/addData", (req, res) => {
  req.body.id = String(Date.now()); 
  students.push(req.body);
  res.redirect("/"); 
});


app.get("/deleteData", (req, res) => {
  students = students.filter((e) => e.id !== req.query.id);
  res.redirect("/"); 
});


app.listen(port, (err) => {
  err ? console.log(err) : console.log("server started on port " + port)
});
