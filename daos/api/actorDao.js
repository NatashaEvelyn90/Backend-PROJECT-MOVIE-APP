const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const actorDao = {
    table: 'actor',

    findAll: (res, table)=> {
        const sql = `SELECT * FROM ${table};`
        
        con.execute(sql, (err, rows) => {
            queryAction(res, err, rows, table)
        });
    },
    
    findActorMovies:(res, table, id)=> {
        const sql = `
            SELECT m.*, a.first_name, a.last_name
            FROM movie m
            JOIN movie_to_actor USING (movie_id)
            JOIN actor a USING (actor_id)
            WHERE a.actor_id = ?;`;

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        });
    },

    sort:(res, table, sorter)=> {
        const allowedTableColumns = ['actor_id', 'first_name', 'last_name', 'img_url']; //* we are allowing ONLY these to be used for sorting

        if (!allowedTableColumns.includes(sorter)) {
            return next(); //! next() will return the little 404 page that we created in our router.js
        }
        const sql = `SELECT * FROM ${table} ORDER BY ${sorter} IS NULL, ${sorter} ASC;` 
        //* SELECT all FROM the actor table. We are ORDERing it BY your choice of actor_id etc and anything with NULL will end up at the bottom. Oh yeah, ASC is ascending; smallest to largest
        con.execute(sql, (err, rows) => {
            queryAction(res, err, rows, table)
        });
    },

    findById:(res, table, id)=> {
        const sql = `SELECT * FROM ${table} WHERE ${table}_id = ?;`
        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        });
    },
}

module.exports = actorDao

//* Crazpicc's Personal Notes

// findAll: (res, table)=> {
//         const sql = `SELECT * FROM ${table};` //! SELECT ALL FROM ${Actor}; 
        
//         con.execute(sql, (err, rows) => {
//             queryAction(res, err, rows, table)
//         });
//     },

// findActorMovies:(res, table, id)=> {
//         const sql = `
//             SELECT m.*, a.first_name, a.last_name //! SELECT ALL movie header columns, actors first name and last name
//             FROM movie m //! From the movie table
//             JOIN movie_to_${table} USING (movie_id) //! JOIN the movie_to_actor table USING the movie_id
//             JOIN ${table} a USING (${table}_id) //! JOIN actor table (a) USING actor_id
//             WHERE a.${table}_id = ?;`; //! WHERE a.actor_id(we are filtering and selecting only this row) = put in a number for the actor id. so like 5.

//         con.execute(sql, [id], (err, rows) => { //! we are using your dbconfig file to connect to SQL, to run(execute) the SQL command you provided safely(here is your sql code, [provide us with the actor_id number here or what value it needs to be], HOWEVER if after it was ran...(if there is an error, it is because of your sql code) => { if an error does happen your helper will take care of it by sending an error response and if it succeeds it will send the data back and you will get an error message
//             queryAction(res, err, rows, table)
//         });
//     },