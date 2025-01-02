const { name } = require("ejs");
const express = require("express");
const port = 1000;

const app = express();
let book = [
  {id:"1" ,image:"https://m.media-amazon.com/images/I/61Le4Mn1AYL._SY466_.jpg" , name:"Metamorphosis " , author:"Franz Kafka" , price:"80",date:"01/02/2005" },
  {id:"1" ,image:"https://m.media-amazon.com/images/I/41MQxal+RtL._SY445_SX342_.jpg" , name:"The Art of Letting Go " , author:"Nick Trenton" , price:"800",date:"01/12/2015" },
  {id:"1" ,image:"https://m.media-amazon.com/images/I/61Le4Mn1AYL._SY466_.jpg" , name:"Metamorphosis " , author:"Franz Kafka" , price:"80",date:"01/02/2005" },
  {id:"1" ,image:"https://m.media-amazon.com/images/I/61Le4Mn1AYL._SY466_.jpg" , name:"Metamorphosis " , author:"Franz Kafka" , price:"80",date:"01/02/2005" },
];

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
      e.image = req.body.image;
    }
    return e;
  });
  res.redirect("/");
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server started on port :" + port);
});
