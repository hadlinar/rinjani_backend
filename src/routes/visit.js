const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '170.1.70.57',
  database: 'krakatau',
  password: 'nusindopub2021**',
  port: 5432,
})

const getVisitCat = (request, response) => {
    pool.query('SELECT * FROM public.mst_visit_cat ORDER BY visit_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
        console.log(results);
    })
}

const getVisit = (request, response) => {
    pool.query('SELECT * FROM public.trn_visit ORDER BY visit_no ASC ', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

const getRealization = (request, response) => {
    pool.query('SELECT * FROM public.trn_real_visit ORDER BY real_no ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

const postVisit = (request, response) => {
    const { 
        visit_cat,
        branch_id,
        cust_id,
        time_start,
        time_finish,
        user_id,
        description,
        pic_position,
        pic_name,
        status_visit } = request.body

    pool.query('INSERT INTO public.trn_visit (visit_no, visit_cat, branch_id, cust_id, time_start, time_finish, user_id, description, pic_position, pic_name, status_visit) VALUES (null, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
            visit_cat,
            branch_id,
            cust_id,
            time_start,
            time_finish,
            user_id,
            description,
            pic_position,
            pic_name,
            status_visit
        ], (error, results) => {
            if(error) {
                throw error
            }
            response.status(201).json({
                "message": "ok",
            })
        })
}

const postRealization = (request, response) => {
    const { 
        visit_no,
        branch_id,
        cust_id,
        time_start,
        time_finish,
        user_id,
        description,
        pic_position,
        pic_name,
        status_visit,
        latitude,
        longitude } = request.body

    pool.query('INSERT INTO public.trn_real_visit(real_no, visit_no, branch_id, cust_id, time_start, time_finish, user_id, description, pic_position, pic_name, status_visit, latitude, longitude) VALUES (null, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [
        visit_no,
        branch_id,
        cust_id,
        time_start,
        time_finish,
        user_id,
        description,
        pic_position,
        pic_name,
        status_visit,
        latitude,
        longitude
    ], (error, results) => {
        if(error) {
            throw error
        }
        response.status(201).json({
            "message": "ok",
        })
    })
}


module.exports = {
    getVisitCat,
    getRealization,
    getVisit,
    postRealization,
    postVisit
}