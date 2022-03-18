const express = require("express");
const router = express.Router();
const Visit = require('../controllers/Visit');

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

router.get(`/visit/:userId`, async (req,res) => {
    let userId = req.params.userId
    let visit = await new Visit().getVisitById(userId)
    return res.status(200).json({
        "message": "ok",
        "result": visit
    })
});

router.post('/visit/:userId', async (req,res) => {
    let body = req.body
    let userId = req.params.userId

    await new Visit().addVisit(
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

    return res.status(200).json({
        "message": "posted",
    })

});


router.post('/realization/:userId', async (req,res) => {
    let body = req.body
    let userId = req.params.userId

    await new Visit().addRealization(
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

    return res.status(200).json({
        "message": "posted",
    })

});

router.get(`/realization/:userId`, async (req,res) => {
    let userId = req.params.userId
    let realization = await new Visit().getRealizationById(userId)
    return res.status(200).json({
        "message": "ok",
        "result": realization
    })
});


module.exports = router;
