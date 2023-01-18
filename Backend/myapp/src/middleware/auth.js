const jwt = require('jsonwebtoken')
const Users = require('../models/users.js');
const Details = require('../models/details.js');
//require('dotenv').config();

const auth = async (req, res, next) =>{
   try{
       const token = req.header('Authorization').replace('Bearer ', '')
       console.log(token)
       const decode = await jwt.verify(token, 'probecode' /*process.env.ACCESS_TOKEN_SECRET*/)
       const users = await Users.findOne({ _id: decode._id, 'tokens.token': token })
       if(!users)
        throw new Error()
    req.token = token
    req.users = users;
    next();
   }catch(e){
       res.status(401).send({error:"authentication gone wrong"})
   }
}

module.exports = auth;