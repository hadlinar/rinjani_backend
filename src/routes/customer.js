const express = require("express");
const router = express.Router();
const Customer = require('../controllers/customer');

router.get('/customer/:branchId', async (req,res) => {
    let branchId = req.params.branchId
    let customer = await new Customer().getCustomer(branchId);
    return res.status(200).json({
        "message": "customer",
        "result": customer
    })
});

router.get('/customer/category', async (req,res) => {
    let customer = await new Customer().getCustomerCategory();
    return res.status(200).json({
        "message": "ok",
        "result": customer
    })
});

module.exports = router;