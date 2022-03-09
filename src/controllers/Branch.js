const db = require('../config/db');

class Branch {
    async getBranch(){
        let results = await db.query(`SELECT * FROM public.mst_branch ORDER BY branch_id ASC`).catch(console.log);
        return results.rows;
    };
};

module.exports = Branch;