const db = require('../config/db');

class User {
    async getAllUser(){
        let results = await db.query(`SELECT * FROM public.mst_user ORDER BY user_id ASC `).catch(console.log);
        return results.rows;
    };
};

module.exports = User;