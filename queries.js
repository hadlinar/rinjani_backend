const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '170.1.70.57',
  database: 'krakatau',
  password: 'nusindopub2021**',
  port: 5432,
})

// user
const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.mst_user ORDER BY user_id ASC ', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

// branch
const getBranch = (request, response) => {
    pool.query('SELECT * FROM public.mst_branch ORDER BY branch_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

//customer
const getCustomer = (request, response) => {
    pool.query('SELECT * FROM public.mst_customer ORDER BY cust_id ASC, branch_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

const getCustomerCat = (request, response) => {
    pool.query('SELECT * FROM public.mst_cust_cat ORDER BY category_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

//employee
const getEmployee = (request, response) => {
    pool.query('SELECT * FROM public.mst_employee ORDER BY nik ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

//visit
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

//role
const getRole = (request, response) => {
    pool.query('SELECT * FROM public.mst_role ORDER BY role_id ASC ', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json({
            "message": "ok",
            "result": results.rows
        })
    })
}

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

module.exports = {
    getUsers,
    getBranch,
    getCustomer,
    getCustomerCat,
    getEmployee,
    getVisitCat,
    getRole,
    getRealization,
    getVisit
}