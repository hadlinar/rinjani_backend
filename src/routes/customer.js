const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '170.1.70.57',
  database: 'krakatau',
  password: 'nusindopub2021**',
  port: 5432,
})

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

module.exports = {
    getCustomer,
    getCustomerCat
}