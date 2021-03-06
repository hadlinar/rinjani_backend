const express = require("express");
const router = express.Router();
const Branch = require('../controllers/Branch');

router.get('/rinjani/branch', async (req,res) => {
    let branch = await new Branch().getBranch();
    return res.status(200).json({
        "message": "ok",
        "result": branch
    })
});

router.get('/rinjani/branch_operasional', async (req,res) => {
    let branch = await new Branch().getBranchOp();
    return res.status(200).json({
        "message": "ok",
        "result": branch
    })
});

module.exports = router;