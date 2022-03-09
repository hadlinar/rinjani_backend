const express = require("express");
const router = express.Router();
const Branch = require('../controllers/branch');

router.get('/branch', async (req,res) => {
    let branch = await new Branch().getBranch();
    return res.status(200).json({
        "message": "ok",
        "result": branch
    })
});

module.exports = router;