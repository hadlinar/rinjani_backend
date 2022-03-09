const db = require('../config/db');

class Employee {
    async getEmployee(){
        let results = await db.query(`SELECT * FROM public.mst_employee ORDER BY nik ASC`).catch(console.log);
        return results.rows;
    };
};

module.exports = Employee;