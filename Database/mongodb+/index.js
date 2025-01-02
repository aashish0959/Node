const express = require("express");
const port = 7412;
const path = require("path");
const fs = require("fs");

const app = express();
const db = require("./config/db");
const schema = require("./model/firstSchema");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));



const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

app.get("/", async (req, res) => {
  let data = await schema.find({});
  res.render("index", { data });
});

app.post("/addData", upload, async (req, res) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  let data = new schema(req.body);
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