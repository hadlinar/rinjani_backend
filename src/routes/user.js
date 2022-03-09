const express = require("express");
const router = express.Router();
const User = require('../controllers/User');

router.get('/users', async (req,res) => {
    let users = await new User().getAllUser();
    return res.status(200).json({
        "message": "ok",
        "result": users
    })
});

module.exports = router;