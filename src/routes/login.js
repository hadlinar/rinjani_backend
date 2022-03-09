const express = require("express");
const router = express.Router();
const Visit = require('../controllers/Visit');

router.post('/login', async (req,res) => {
    let nik = req.body.nik;
    // let password = req.body.password;
    res.send(`nik: ${nik}`);
    // let users = await new User().getAllUser();
    // return res.status(200).json({
    //     "message": "ok",
    //     "result": users
    // })
});