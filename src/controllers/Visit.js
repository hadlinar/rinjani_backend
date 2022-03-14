const db = require('../config/db');

class Visit {

    async getAllVisit(){
        let results = await db.query(`SELECT * FROM public.trn_visit ORDER BY visit_no ASC`).catch(console.log);
        return results.rows;
    };

    async getVisitById(userId){
        let result = await db.query(`SELECT 
        public.trn_visit.visit_no, 
        public.trn_visit.visit_cat, 
        public.trn_visit.branch_id, 
        public.mst_customer.cust_name, 
        public.trn_visit.time_start, 
        public.trn_visit.time_finish, 
        public.trn_visit.user_id, 
        public.trn_visit.description, 
        public.trn_visit.pic_position, 
        public.trn_visit.pic_name, 
        public.trn_visit.status_visit
        FROM public.trn_visit
        LEFT JOIN public.mst_customer
        ON public.trn_visit.cust_id=public.mst_customer.cust_id
        WHERE user_id=$1;`, [userId])
        .catch(console.log);

        return result.rows;        
    };

    async getRealizationById(userId){
        let result = await db.query(`SELECT 
        r.real_no, 
        r.visit_no, 
        r.branch_id, 
        cust.cust_name, 
        r.time_start, 
        r.time_finish, 
        r.user_id, 
        r.description, 
        r.pic_position, 
        r.pic_name, 
        r.status_visit, 
        r.latitude, 
        r.longitude
        FROM public.trn_real_visit as r
        LEFT JOIN public.mst_customer as cust
        ON r.cust_id=cust.cust_id
        WHERE user_id=$1;`, [userId])
        .catch(console.log);

        return result.rows;        
    };

    async getVisitCat(){
        let results = await db.query(`SELECT * FROM public.mst_visit_cat ORDER BY visit_id ASC `).catch(console.log);
        return results.rows;
    };

    async addVisit(visitCat, branchId, custId, timeStart, timeFinish, userId, description, picPosition, picName, statisVisit){
        await db.query(`INSERT INTO public.trn_visit(
            visit_no, 
            visit_cat, 
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
                visitCat, 
                branchId,
                custId,
                timeStart,
                timeFinish,
                userId,
                description,
                picPosition,
                picName,
                statisVisit
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
        lng){
        await db.query(`INSERT INTO public.trn_real_visit(
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
            longitude)
            VALUES ('', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,[
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
                lng])
        .catch(console.log);

        return;        
    };

    // //update a todo.
    // async updateTodo(todoId){

    //     //get the previous todo.
    //     let original_todo = await db.query(
    //         `SELECT * FROM todos WHERE id=$1`,[parseInt(todoId)]
    //     ).catch(console.log);

    //     //update
    //     await db.query(`UPDATE todos SET checked=$1 WHERE id=$2`,[!original_todo.rows[0].checked,parseInt(todoId)])
    //     .catch(console.log);

    //     return;
    // };

    // //delete a todo.
    // async deleteTodo(todoId){
        
    //     //delete todo
    //     await db.query(`DELETE FROM todos WHERE id=$1`,[parseInt(todoId)])
    //     .catch(console.log);

    //     return;        
    // };

};

module.exports = Visit;

