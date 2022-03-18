const express = require("express");
const router = express.Router();
const User = require('../controllers/User');
const  jwt  =  require("jsonwebtoken");

router.get('/users', async (req,res) => {
    let users = await new User().getAllUser();
    return res.status(200).json({
        "message": "ok",
        "result": users
    })
});

router.get('/user/:userId', async (req,res) => {
    let userId = req.params.userId
    let user = await new User().getUser(userId);
    return res.status(200).json({
        "message": "ok",
        "result": user
    })
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.get('/user', authenticateJWT, (req, res) => {
    res.json(user);
});

module.exports = router;