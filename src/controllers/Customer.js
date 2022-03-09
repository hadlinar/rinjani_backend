const db = require('../config/db');

class Customer {
    async getCustomer(){
        let results = await db.query(`SELECT * FROM public.mst_customer ORDER BY cust_id ASC, branch_id ASC`).catch(console.log);
        return results.rows;
    };

    async getCustomerCategory(){
        let results = await db.query(`SELECT * FROM public.mst_cust_cat ORDER BY category_id ASC`).catch(console.log);
        return results.rows;
    };
};

module.exports = Customer;