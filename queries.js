const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '170.1.70.57',
  database: 'krakatau',
  password: 'nusindopub2021**',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.mst_user ORDER BY user_id ASC ', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
}