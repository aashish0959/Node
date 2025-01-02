const express = require("express");
const port = 7410;
const path = require("path");

const app = express();
const db = require("./config/db");
const schema = require("./model/firstSchema");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("path.join(__dirname, 'public')"));

app.get("/", async (req, res) => {
  let data = await schema.find({});
  res.render("index", { data });
});

app.post("/addData", async (req, res) => {
  let data = schema(req.body);
  await data.save().then(() => {
    res.redirect("/");
  });
});

app.get("/deleteData", async (req, res) => {
  await schema.findByIdAndDelete(req.query.id).then((data) => {
    res.redirect("/");
  });
});

app.get("/editData", async (req, res) => {
  let data = await schema.findById(req.query.id);
  res.render("edit", { data });
});

app.post("/updateData", async (req, res) => {
  await schema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
    res.redirect("/");
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port", port);
});
