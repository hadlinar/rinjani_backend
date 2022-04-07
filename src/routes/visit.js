const express = require("express");
const router = express.Router();
const Visit = require('../controllers/Visit');
const  jwt  =  require("jsonwebtoken");

router.get('/visits', async (req,res) => {
    const Visit = require('../controllers/Visit');
    let visits = await new Visit().getAllVisit();
    return res.status(200).json({
        "message": "ok",
        "result": visits
    })
});

router.get('/visit/category', async (req,res) => {
    let visits = await new Visit().getVisitCat()
    return res.status(200).json({
        "message": "ok",
        "result": visits
    })
});

router.get('/visit', verifyToken, (req, res)=>{  
    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try {
            let userId = authData.nik
            let visit = new Visit().getVisitById(userId)
            visit.then(function(result) {
                res.status(200).json({
                    "message": "ok",
                    "result": result
                })
            })
        } catch (e) {
            res.status(500).json({
                 message: 'Failed to authenticate token.'
            });

            res.status(403).json({
                message: "Session time out",
            });
        }
    });  
});

router.get('/visit/all', verifyToken, (req, res)=>{  
    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try {
            let userId = authData.nik
            let visit = new Visit().getVisitByIdAll(userId)
            visit.then(function(result) {
                res.status(200).json({
                    "message": "ok",
                    "result": result
                })
            })
        } catch (e) {
            res.status(500).json({
                 message: 'Failed to authenticate token.'
            });

            res.status(403).json({
                message: "Session time out",
            });
        }
    });  
});

router.delete('/visit/:visitNo', verifyToken, (req, res)=>{  
    let visitNo = req.params.visitNo
    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try {
            let userId = authData.nik
            let visit = new Visit().deleteVisit(userId, visitNo)
            visit.then(function(result) {
                res.status(200).json({
                    "message": "deleted",
                })
            })
        } catch (e) {
            res.status(500).json({
                 message: 'Failed to authenticate token.'
            });

            res.status(403).json({
                message: "Session time out",
            });
        }
    });  
});

router.post('/visit', verifyToken, (req,res) => {
    let body = req.body

    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try {
            let userId = authData.nik
            new Visit().addVisit(
                body.visit_id,
                body.branch_id,
                body.cust_id,
                body.time_start,
                body.time_finish,
                userId,
                body.description,
                body.pic_position,
                body.pic_name,
                body.status_visit
            );
            res.status(200).json({
                "message": "posted"
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

});

router.post('/realization', verifyToken, (req,res) => {
    let body = req.body

    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try {
            let userId = authData.nik
            new Visit().addRealization(
                body.visit_no,
                body.branch_id,
                body.cust_id,
                body.time_start,
                body.time_finish,
                userId,
                body.description,
                body.pic_position,
                body.pic_name,
                body.status_visit,
                body.latitude,
                body.longitude
            );
            res.status(200).json({
                "message": "posted"
            })
        } catch(e) {
            res.status(500).json({
                 message: 'Failed to authenticate token.'
            });

            res.status(403).json({
                message: "Session time out",
            });
        }
    }); 

});

router.get(`/realization/:filter`, verifyToken, (req,res) => {
    let filter = req.params.filter
    let filtered
    if(filter == 'week') {
        filtered = '1 week'
    } else if(filter == 'day') {
        filtered = '1 day'
    } else if(filter == 'month') {
        filtered = '1 month'
    } else {
        filtered = '1 year'
    }

    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try{
            let userId = authData.nik
            let realization = new Visit().getRealizationById(userId, filtered)
            realization.then(function(result) {
                res.status(200).json({
                    "message": "ok",
                    "result": result
                })
            })
        } catch(e) {

            res.status(500).json({
                message: 'Failed to authenticate token.'
           });
           
            res.status(403).json({
                message: "Session time out",
            });
        }
    });
});

router.get(`/realization_operasional/:branchId/:filter`, async (req,res) => {
    let branchId = req.params.branchId
    let filter = req.params.filter
    let filtered
    if(filter == 'week') {
        filtered = '1 week'
    } else if(filter == 'day') {
        filtered = '1 day'
    } else if(filter == 'month') {
        filtered = '1 month'
    } else {
        filtered = '1 year'
    }
    let realization = await new Visit().getRealizationOp(branchId, filtered)
    return res.status(200).json({
        "message": "ok",
        "result": realization
    })
});

router.get(`/pdf/:startDate/:endDate`, verifyToken, (req,res) => {
    let startDate = req.params.startDate
    let endDate = req.params.endDate

    jwt.verify(req.token, process.env.SECRET_KEY,(err,authData)=>{
        try{
            let userId = authData.nik
            let realization = new Visit().getPDF(userId, startDate, endDate)
            realization.then(function(result) {
                res.status(200).json({
                    "message": "ok",
                    "result": result
                })
            })
        } catch(e) {

            res.status(500).json({
                message: 'Failed to authenticate token.'
           });
           
            res.status(403).json({
                message: "Session time out",
            });
        }
    });


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
