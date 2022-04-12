const express = require("express");
const router = express.Router();
const Customer = require('../controllers/Customer');

router.get('/rinjani/customer/:branchId', async (req,res) => {
    let branchId = req.params.branchId
    let customer = await new Customer().getCustomer(branchId);
    return res.status(200).json({
        "message": "ok",
        "result": customer
    })
});

router.get('/rinjani/customers/category', async (req,res) => {
    let customer = await new Customer().getCustomerCategory();
    return res.status(200).json({
        "message": "ok",
        "result": customer
    })
});

module.exports = router;