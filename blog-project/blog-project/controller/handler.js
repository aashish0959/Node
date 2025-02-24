const firstschema = require('../model/firstschema')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')




module.exports.home = (req,res)=>{
   res.render('index')
}
module.exports.Singup = (req,res)=>{
   res.render('resgister')
}
module.exports.signup = (req,res)=>{
   res.render('signup')
}