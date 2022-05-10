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

    async addNewCustomer(
        branchId,
        custName,
    ) {
        await db.query(`
        INSERT INTO public.mst_customer(
            branch_id,
            cust_name
        ) VALUES ($1, $2)`, [
            branchId,
            custName
        ])
        .catch(console.log);

        let results = await db.query(`
            SELECT cust_id FROM public.mst_customer WHERE cust_name=$1
        `, [custName]).catch(console.log);

        return results.rows[0];   
    }
};

module.exports = Customer;