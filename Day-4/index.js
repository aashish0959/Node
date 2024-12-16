const express = require("express");
const port = 9630;

const app = express();

app.listen(port , (err) => {
  err ? console.log(err) : console.log("server starte in port :" + port)
})
