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

const postRealization = (request, response) => {
    const { 
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
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }


module.exports = {
    getVisitCat,
    getRealization,
    getVisit,
    
}