const db = require('../config/db');

class Visit {

    async getAllVisit(){
        let results = await db.query(`SELECT * FROM public.trn_visit ORDER BY visit_no ASC`).catch(console.log);
        return results.rows;
    };

    async getVisitById(userId){
        let result = await db.query(`SELECT 
        v.visit_no, 
        v.visit_id, 
       	v.branch_id, 
        cu.cust_name, 
        v.cust_id, 
        v.time_start, 
        v.time_finish, 
        v.user_id, 
        v.description, 
        v.pic_position, 
        v.pic_name, 
        v.status_visit
        FROM public.trn_visit as v
        LEFT JOIN public.mst_customer as cu
        ON v.cust_id=cu.cust_id AND v.branch_id=cu.branch_id
        WHERE v.user_id=$1 AND v.status_visit='n' AND v.time_start > TIMESTAMP 'today'
        ORDER BY v.visit_no ASC;`, [userId])
        .catch(console.log);

        return result.rows;        
    };

    async getVisitByIdAll(userId){
        let result = await db.query(`SELECT 
        v.visit_no, 
        v.visit_id, 
       	v.branch_id, 
        cu.cust_name, 
        v.cust_id, 
        v.time_start, 
        v.time_finish, 
        v.user_id, 
        v.description, 
        v.pic_position, 
        v.pic_name, 
        v.status_visit
        FROM public.trn_visit as v
        LEFT JOIN public.mst_customer as cu
        ON v.cust_id=cu.cust_id AND v.branch_id=cu.branch_id
        WHERE v.user_id=$1
        ORDER BY v.visit_no ASC;`, [userId])
        .catch(console.log);

        return result.rows;        
    };

    async deleteVisit(userId, visitNo){
        let result = await db.query(`DELETE FROM public.trn_visit
        WHERE visit_no=$2 and user_id=$1;`, [userId, visitNo])
        .catch(console.log);

        return result.rows;        
    };

    async getRealizationById(userId, filtered){
        let result = await db.query(
            `select visit_no, real_no, branch_id, f_branch_name(branch_id) branch, cust_id, f_cust_name(branch_id, cust_id) customer, time_start, time_finish,
            user_id, f_employee_name(user_id) employee, description, pic_position, pic_name, status_visit, latitude, longitude, description_real
            from trn_real_visit
            where (cust_id = '') IS NOT TRUE and time_finish > now() - $2::interval
            and user_id = $1
            order by real_no desc`,
        [userId, filtered])
        .catch(console.log);

        return result.rows;        
    };

    async getRealizationOp(branchId, filtered){
        let result = await db.query(
            `select visit_no, real_no, branch_id, f_branch_name(branch_id) branch, cust_id, f_cust_name(branch_id, cust_id) customer, time_start, time_finish,
            user_id, f_employee_name(user_id) employee, description, pic_position, pic_name, status_visit, latitude, longitude, description_real
            from trn_real_visit
            where (cust_id = '') IS NOT TRUE AND time_finish > now() - $2::interval
            and branch_id = case when branch_id = '0' then branch_id else $1 end
            order by real_no, branch_id desc`, [branchId, filtered])
        .catch(console.log);

        return result.rows;        
    };

    async getVisitCat(){
        let results = await db.query(`SELECT * FROM public.mst_visit_cat ORDER BY visit_id ASC `).catch(console.log);
        return results.rows;
    };

    async addVisit(visitId, branchId, custId, timeStart, timeFinish, userId, description, picPosition, picName, statusVisit){
        await db.query(`INSERT INTO public.trn_visit(
            visit_no, 
            visit_id, 
            branch_id, 
            cust_id, 
            time_start, 
            time_finish, 
            user_id, 
            description, 
            pic_position, 
            pic_name, 
            status_visit)
            VALUES ('', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[ 
                visitId, 
                branchId,
                custId,
                timeStart,
                timeFinish,
                userId,
                description,
                picPosition,
                picName,
                statusVisit
            ])
        .catch(console.log);

        return;        
    };

    async addRealization(
        visitNo, 
        branchId, 
        custId, 
        timeStart, 
        timeFinish, 
        userId, 
        description, 
        picPosition, 
        picName, 
        statusVisit,
        lat,
        lng,
        descReal){
        await db.query(`
            WITH updated AS (
                UPDATE public.trn_visit
                    SET status_visit='y'
                WHERE public.trn_visit.visit_no = $1
                returning *
            )
            INSERT INTO public.trn_real_visit(
                real_no, 
                visit_no, 
                branch_id, 
                cust_id, 
                time_start, 
                time_finish, 
                user_id, 
                description, 
                pic_position, 
                pic_name, 
                status_visit, 
                latitude, 
                longitude,
                description_real)
            VALUES ('', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);          
        `,[
                visitNo, 
                branchId, 
                custId, 
                timeStart, 
                timeFinish, 
                userId, 
                description, 
                picPosition, 
                picName, 
                statusVisit,
                lat,
                lng,
                descReal])
        .catch(console.log);

        return;        
    };

    async getCustomerBar(branchId){            
        let results = await db.query(`
        select b.category_id, f_cust_cat(b.category_id) category, coalesce(count(a.visit_id::numeric),0) amount
        from trn_visit a, mst_customer b
        where a.cust_id = b.cust_id
        and a.branch_id = b.branch_id
        and a.branch_id = case when a.branch_id = '0' then a.branch_id else $1 end
        group by b.category_id
        order by b.category_id`, [branchId]).catch(console.log);
        return results.rows;
    };

    async getPDF(userId, startDate, endDate){
        let result = await db.query(
            `select real_no, visit_no, branch_id, f_branch_name(branch_id) branch, cust_id, f_cust_name(branch_id, cust_id) customer, f_user_email(user_id) email, time_start, time_finish,
            user_id, f_employee_name(user_id) employee, description_real, pic_position, pic_name
            from trn_real_visit
            where DATE_TRUNC ('day', time_finish) BETWEEN $2 AND $3
            and user_id=$1
            order by real_no, branch_id desc`, [userId, startDate, endDate])
        .catch(console.log);

        return result.rows;        
    };

};

module.exports = Visit;

