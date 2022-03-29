
const express = require("express");
require("dotenv").config();
const router = express.Router();
const  jwt  =  require("jsonwebtoken");

router.post('/logout', verifyToken, (req, res) => {
    const authHeader = req.headers["authorization"];

    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({message : 'Log out'});
        } else {
            res.send({message: err});
        }
    })
})

function verifyToken(req, res, next) { 
    const bearerHearder = req.headers['authorization'];
    if(typeof bearerHearder != 'undefined'){
        const bearer = bearerHearder.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();  
  
    } else {  
        res.sendStatus(403);  
    }  
} 


module.exports = router;