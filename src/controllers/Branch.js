const db = require('../config/db');

class Branch {
    async getBranch(){
        let results = await db.query(`SELECT * FROM public.mst_branch ORDER BY branch_id ASC`).catch(console.log);
        return results.rows;
    };

    async getBranchOp(){
        let results = await db.query(`
        SELECT branch_id, branch_name
        from (select distinct cabang.branch_id, cabang.branch_name
              from mst_branch cabang
                  union all
                  select '0','ALL CABANG') A
                  order by branch_id asc`).catch(console.log);
        return results.rows;
    };

};

module.exports = Branch;