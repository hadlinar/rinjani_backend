const db = require('../config/db');

class Customer {
    async getCustomer(branchId){
        let results = await db.query(`SELECT cust_id, branch_id, cust_name, category_id, address, city
        FROM public.mst_customer
        WHERE branch_id=$1;`, [branchId]).catch(console.log);
        return results.rows;
    };

    async getCustomerCategory(){
        let results = await db.query(`SELECT * FROM public.mst_cust_cat ORDER BY category_id ASC`).catch(console.log);
        return results.rows;
    };
};

module.exports = Customer;