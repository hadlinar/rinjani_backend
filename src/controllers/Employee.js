const db = require('../config/db');

class Employee {
    async getEmployee(){
        let results = await db.query(`SELECT * FROM public.mst_employee ORDER BY nik ASC`).catch(console.log);
        return results.rows;
    };

    async getEmployeeById(branchId){
        let results = await db.query(`SELECT * FROM public.mst_employee
        WHERE branch_id=$1;`, [branchId]).catch(console.log);
        return results.rows;
    };
};

module.exports = Employee;