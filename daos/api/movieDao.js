// #region
//! MovieDao short summary
//? findAll: shows all your movies and their info
//? sort: can sort movies by runtime, gross etc
//? findByGenre: can sort by genres
//? findById: can sort movies by id number

// #endregion

const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const movieDao = {
    table: 'movie', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    findAll: (res, table)=> {
        const sql = `
            SELECT 
                m.movie_id, m.title, m.rating,
                m.runtime, m.nationality, m.yr_released, 
                m.budget, m.gross, m.production_id, 
                m.showing, m.poster,  
                GROUP_CONCAT(g.genre SEPARATOR ', ') AS genres               
            FROM movie m 
            LEFT JOIN movie_to_genre mg ON m.movie_id = mg.movie_id
            LEFT JOIN genre g ON mg.genre_id = g.genre_id
            GROUP BY m.movie_id
            ORDER BY m.movie_id;`;
            
        con.execute(sql, (err, rows)=> {
            queryAction(res, err, rows, table)
        })    
    },

    sort: (res, table, sorter) => {
        const sql = `SELECT * FROM ${table} ORDER BY ${sorter};`

        con.execute(sql, (err, rows)=> {
            queryAction(res, err, rows, table)
        })
    },

    findByGenre: (res, table, genre) => {
        const sql = `
            SELECT 
                m.movie_id, m.title, m.rating,
                m.runtime, m.nationality, m.yr_released,
                m.budget, m.gross, m.showing,
                m.poster, g.genre
            FROM movie m
            JOIN movie_to_genre USING (movie_id)
            JOIN genre g USING (genre_id)
            WHERE g.genre = ? OR g.genre_id = ?;`

        con.execute(sql, [genre, genre], (err, rows)=> {
            queryAction(res, err, rows, table)
        })
    },

    findById: (res, table, id) => {
        const sql = `
            SELECT 
                m.*,
                GROUP_CONCAT(g.genre SEPARATOR ', ') AS genres
            FROM movie m
            LEFT JOIN movie_to_genre mg USING (movie_id)
            LEFT JOIN genre g ON mg.genre_id = g.genre_id
            WHERE m.movie_id = ?
            GROUP BY m.movie_id;`

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        })    
    }
};

module.exports = movieDao

//* Crazpicc's "Possible" SQL Translation + notes below
// #region
//? These notes are to explain the SQL part in the "findAll" category. 
        // const sql = `
        // SELECT //! I want to SELECT all this data listed below:
        //     m.movie_id, m.title, m.rating, //? WE
        //     m.runtime, m.nationality, m.yr_released, //? ARE
        //     m.budget, m.gross, m.production_id, //? THE
        //     m.showing, m.poster, //? DATA!
        //     GROUP_CONCAT(g.genre SEPARATOR ', ') AS genres //! Group the genre table as genres, separated by comas on a straight row. GROUP_CONCAT cannot be changed as that is a mySQL code
        // FROM movie m //! FROM the movie table (but I am also giving it a alias/nickname called "m" so now table wil be called m)
        // LEFT JOIN movie_to_genre mg ON m.movie_id = mg.movie_id //! LEFT JOIN(show all the movies listed) movie_to_genre mg(alias) ON(joining things together) m.movie_id = mg.movie_id. Basically should show all the movies even if it is missng a genre
        // LEFT JOIN genre g ON mg.genre_id = g.genre_id
        // GROUP BY m.movie_id
        // ORDER BY m.movie_id;` //! We are keeping everything in order by the movie_id number. SO it should count from 1 till whatever.;
        
// #endregion

//? ABOUT EACH SECTION
    
        //! findALL 
    // #region

        //? FindAll pulls all the movies from the SQL database you created. In this code, we have also joined the movie_to_genre and genre tables, so each movie displays its genre info too.
        //? ORDER BY keeps the results sorted by movie_id (counting from 1 and so forth)

    // #endregion 

        // ! sort
    // #region

        //? sorts allows you to sort based on the column you choose — like title, runtime, or year released. So whenever you type the URL it would be something like so (example: /api/movie/sort/title). *title is the sorter
        //? ORDER BY will keep it in whatever order it will be sorted by. 

    //     sort: (res, table, sorter) => { 
    //     const sql = `SELECT * FROM ${table} ORDER BY ${sorter};` //* SELECT (all*) FROM the ${Movie table}. Make sure to ORDER it BY ${title, runtime, etc}

    //     con.execute(sql, (err, rows)=> { //* con = auto login to SQL, .execute(sql)= run the code I worte. (err, rows)= show me if something went wrong, give me the results.
    //         queryAction(res, err, rows, table) //* Displays our helper file
    //     })
    // },

    // #endregion 

        //! findByGenre 
    // #region
    
        //? findByGenre finds all movies that match a specific genre.
        //? You can search by the genre category OR by the genre_id (example: /api/movie/genre/3 OR /api/movie/genre/comedy).

    // #endregion

        //! findById
    // #region 

        //? findById uses a single movie by its unique ID. (Example route: /api/movie/5)
        //? The question mark (?) is a placeholder that safely inserts the movie ID using an array value.

    // #endregion 
