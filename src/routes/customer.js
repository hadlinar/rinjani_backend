const express = require("express");
const router = express.Router();
const Customer = require('../controllers/Customer');
const Visit = require('../controllers/Visit');
const db = require('../config/db');
const jwt  =  require("jsonwebtoken");

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

router.post('/rinjani/add_customer', verifyToken, async (req,res) => {
    let body = req.body
    try {
        const data = await db.query(`SELECT * FROM public.mst_customer WHERE branch_id=$1 AND cust_name=$2`, [body.branch_id, body.cust_name]);
        // console.log(data.rows[0]['cust_id']);
        const arr  =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(400).json({
            error: "Customer is already registered",
            });
        }
        else {
            let newCust = await new Customer().addNewCustomer(
                body.branch_id,
                body.cust_name
            );
            // console.log(newCust['cust_id'])
            // return res.status(200).json({
            //     "message": "ok",
            //     "result": newCust.rows
            // })
            jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
                try {
                    let userId = authData.nik
                    new Visit().addVisit(
                        body.visit_id,
                        body.branch_id,
                        newCust['cust_id'],
                        body.time_start,
                        body.time_finish,
                        userId,
                        body.description,
                        body.pic_position,
                        body.pic_name,
                        body.status_visit
                    );
                    res.status(200).json({
                        "message": "ok"
                    })
                } catch {
                    res.status(500).json({
                            message: 'Failed to authenticate token.'
                    });
        
                    res.status(403).json({
                        message: "Session time out",
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error",
        });
    };

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