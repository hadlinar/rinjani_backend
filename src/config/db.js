const Pool = require('pg').Pool

// const pool = new Pool({
//   user: 'postgres',
//   host: '170.1.70.57',
//   database: 'krakatau',
//   password: 'nusindopub2021**',
//   port: 5432,
// })

const pool = new Pool({
  user: 'postgre',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})

module.exports = pool;