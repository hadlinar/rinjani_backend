const db = require('../config/db');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

class Login {
    // async getRole(){
    //     let results = await db.query(`SELECT * FROM public.mst_role ORDER BY role_id ASC`).catch(console.log);
    //     return results.rows;
    // };
    
    async authenticate({ nik, password }) {
        // get account from database
        const account = await db.Account.findOne({ nik });
    
        // check account found and verify password
        if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
            // authentication failed
            return false;
        } else {
            // authentication successful
            return true;
        }
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