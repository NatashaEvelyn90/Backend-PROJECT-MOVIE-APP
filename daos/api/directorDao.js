//TODO Step 1: Connecting to the data/table 
//? Make sure to add your helper file as that is needed here as well 
const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const directorDao = {
    table: 'director',
    
    findDirectorMovies:(res, table, id)=> {
        const sql = `
            SELECT m.*, d.first_name, d.last_name
            FROM movie m
            JOIN movie_to_director USING (movie_id)
            JOIN director d USING (director_id)
            WHERE d.director_id = ?;`;

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        });
    }
}

module.exports = directorDao