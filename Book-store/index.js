const express = require("express");
const port = 7414;
const path = require("path");
const fs = require("fs");

const app = express();
const db = require("./config/db");
const schema = require("./model/firstSchema");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  let data = await schema.find({});
  res.render("index", { data });
});

app.post("/addData", upload.single("cover_image"), async (req, res) => {
  if (req.file) {
    req.body.cover_image = req.file.path;
  }
  let data = new schema(req.body);
  await data.save().then(() => {
    res.redirect("/");
  });
});

app.get("/deleteData", async (req, res) => {
  singleData = await schema.findById(req.query.id);
  fs.unlink(singleData.cover_image, (err) => {
    if (err) {
      console.log(err);
    }
  });
  await schema.findByIdAndDelete(req.query.id).then((data) => {
    res.redirect("/");
  });
});

app.get("/editData", async (req, res) => {
  let data = await schema.findById(req.query.id);
  res.render("edit", { data });
});

app.post("/updateData", async (req, res) => {
  let img = " ";
  let singleData = await schema.findById(req.body.id);
  req.file ? (img = req.file.path) : (img = singleData.image);
  req.file && fs.unlink(singleData.image);
  req.body.cover_image = img;

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
