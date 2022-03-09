const db = require('../config/db');

class Visit {

    async getAllVisit(){
        let results = await db.query(`SELECT * FROM public.trn_visit ORDER BY visit_no ASC`).catch(console.log);
        return results.rows;
    };

    async getVisitById(userId){
        let result = await db.query(`SELECT (
             visit_no, 
             visit_cat, 
             branch_id, 
             cust_id, 
             time_start, 
             time_finish, 
             description, 
             pic_position, 
             pic_name, 
             status_visit) 
         FROM public.trn_visit 
         WHERE user_id=$1
         ORDER BY visit_no ASC`, [userId])
        .catch(console.log);

        return result.rows;        
    };

    async getVisitCat(){
        let results = await db.query(`SELECT * FROM public.mst_visit_cat ORDER BY visit_id ASC `).catch(console.log);
        return results.rows;
    };

    //create a todo.
    // async createTodo(todo){

    //     await db.query('INSERT INTO todos (title, checked) VALUES ($1, $2)',[todo.title,false])
    //     .catch(console.log);

    //     return;        
    // };

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