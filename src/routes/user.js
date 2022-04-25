const express = require("express");
const router = express.Router();
const User = require('../controllers/User');
const  jwt  =  require("jsonwebtoken");

router.get('/rinjani/users', async (req,res) => {
    let users = await new User().getAllUser();
    return res.status(200).json({
        "message": "ok",
        "result": users
    })
});

router.post('/rinjani/user', verifyToken, (req, res) => {   
    jwt.verify(req.token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ 
            message: 'Failed to authenticate token.' 
        });

        let userId = decoded.nik
        let user = new User().getUser(userId);
        user.then(function(result) {
            res.status(200).json({
                "message": "ok",
                "result": result.rows[0]
            })
        })
      });
});

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