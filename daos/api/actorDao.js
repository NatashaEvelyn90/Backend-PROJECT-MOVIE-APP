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
            JOIN movie_to_${table} USING (movie_id)
            JOIN ${table} a USING (${table}_id)
            WHERE a.${table}_id = ?;`;

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
        //* Selecting all from the actor table. We are ordering it by your choice of actor_id etc and anything with NULL will end up at the bottom. Oh yeah, ASC is ascending; smallest to largest
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