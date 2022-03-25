const db = require('../config/db');

class Login {
    
    async login(nik) {
        let result = await db.query(`SELECT u.user_id, e.name, u.nik, u.branch_id, u.password, u.email, u.role_id, u.flg_used
        FROM public.mst_user as u, public.mst_employee as e
        WHERE u.nik = e.nik AND u.user_id=$1;`, [nik])

        return result;
    }

    async createUser([user_id, nik, branch_id, password, email, role_id, flg_used]){
        let results = await db.query(`INSERT INTO public.mst_user(
            user_id, nik, branch_id, password, email, role_id, flg_used)
            VALUES ('$1', '$2', '$3', '$4', '$5', '$6', '$7');`, [
                user_id, nik, branch_id, password, email, role_id, flg_used
            ]).catch(console.log);
        return;
    };
};

module.exports = Login;