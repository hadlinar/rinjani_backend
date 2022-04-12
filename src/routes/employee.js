const express = require("express");
const router = express.Router();
const Employee = require('../controllers/Employee');

router.get('/rinjani/employee', async (req,res) => {
    let employee = await new Employee().getEmployee();
    return res.status(200).json({
        "message": "ok",
        "result": employee
    })
});

module.exports = router;