const db = require('../config/db');

class Role {
    async getRole(){
        let results = await db.query(`SELECT * FROM public.mst_role ORDER BY role_id ASC`).catch(console.log);
        return results.rows;
    };
};

module.exports = Role;