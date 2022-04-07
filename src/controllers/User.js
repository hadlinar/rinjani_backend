const db = require('../config/db');

class User {
    async getAllUser(){
        let results = await db.query(`SELECT * FROM public.mst_user ORDER BY user_id ASC `).catch(console.log);
        return results.rows;
    };

    async getUser(userId){
        let results = await db.query(`SELECT u.user_id, e.name, u.nik, u.branch_id, f_branch_name(u.branch_id) branch, u.email, u.role_id, u.flg_used
        FROM public.mst_user as u, public.mst_employee as e
        WHERE u.nik = e.nik AND u.user_id=$1; `, [userId]).catch(console.log);
        return results;
    };

};

module.exports = User;