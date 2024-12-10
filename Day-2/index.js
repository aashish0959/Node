const express = require("express");
const port = 2209;

const app = express();
const students = [

    {"id": "1",
    "name": "aa",
    "subejct": "a123"},
    {"id": "2",
    "name": "bb",
    "subejct": "b123"},
    {"id": "3",
    "name": "cc",
    "subejct": "c123"},
    {"id": "4",
    "name": "dd",
    "subejct": "d123"},
  
];
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { students });
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log("started on port :" + port);
});
