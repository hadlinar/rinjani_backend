const express = require("express");
const router = express.Router();
const Role = require('../controllers/Role');

router.get('/rinjani/role', async (req,res) => {
    let role = await new Role().getRole();
    return res.status(200).json({
        "message": "ok",
        "result": role
    })
});

module.exports = router;