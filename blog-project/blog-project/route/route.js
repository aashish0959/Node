const express = require('express')
const route = express.Router()
const ctl  = require('../controller/handler')
// const upload = require('../middleware/upload')
// const auth = require("../middleware/authjwt")



route.get("/",ctl.home)
route.get("/Singup",ctl.Singup)
route.post("/signup",ctl.signup)


module.exports = route