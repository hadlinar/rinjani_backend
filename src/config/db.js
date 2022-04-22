const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: '170.1.70.54',
  database: 'rinjani_dev',
  password: 'nusindodev2021**',
  port: 5432,
})

module.exports = pool;