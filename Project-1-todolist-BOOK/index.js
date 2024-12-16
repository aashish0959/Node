const express = require("express");
const port = 4512;

const app = express();
let book = [];

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index", { book });
});

app.post("/addData", (req, res) => {
  req.body.id = String(Date.now());
  book.push(req.body);
});

app.get("/deleteData", (req, res) => {
  book = book.filter((e) => e.id !== req.query.id);
  res.redirect("/");
});
app.get("/editData/:id", (req, res) => {
  console.log("Requested ID:", req.params.id);
  const singleData = book.find((item) => item.id === req.params.id);
  console.log("Found Data:", singleData);
  res.render("edit", { singleData });
});

app.post("/updataData", (req, res) => {
  book.map((e) => {
    if (e.id == req.body.id) {
      e.name = req.body.name;
      e.author = req.body.author;
      e.price = req.body.price;
      e.date = req.body.date;
    }
    return e;
  });
  res.redirect("/");
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server started on port :" + port);
});
