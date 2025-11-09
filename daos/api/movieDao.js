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
    table: 'movie',

    findAll: (res, table)=> {
        const sql = `
            SELECT 
                m.movie_id, m.title, m.rating,
                m.runtime, m.nationality, m.yr_released, 
                m.budget, m.gross, m.production_id, 
                m.showing, m.poster, g.genre_id, g.genre 
            FROM movie m 
            JOIN movie_to_genre USING (movie_id)  
            JOIN genre g USING (genre_id) 
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


    //? This method finds a single movie by its unique ID.
    //? Example route: /api/movie/5
    //? The question mark (?) is a placeholder that safely inserts the movie ID using an array value.
    findById: (res, table, id) => {
        const sql = `
            SELECT
                m.*,
                g.genre
            FROM movie m
            JOIN movie_to_genre USING (movie_id)    
            JOIN genre g USING (genre_id
            WHERE module.movie_id = ?;`

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
        //     m.showing, m.poster, g.genre_id, g.genre //? DATA!
        // FROM movie m //! FROM the movie table (but I am also giving it a alias/nickname called "m" so now forth table wil be called m)
        // JOIN movie_to_genre USING (movie_id) //! I want to JOIN the movie_to_genre data USING the movie_id data. This is a bridge that connects the movies to the genres.
        // JOIN genre g USING (genre_id) //! I want to JOIN the genre table ( NEW alias: g) USING the genre_id data. I want to make sure the genres are listed.
        // ORDER BY m.movie_id;` //! We are keeping everything in order by the movie_id number. SO it should count from 1 till whatever.;

    //* ABOUT EACH SECTION
    
        //! findALL 
    // #region

        //? FindAll pulls all the movies from the SQL database you created. In this code, we have also joined the movie_to_genre and genre tables, so each movie displays its genre info too.
        //? ORDER BY keeps the results sorted by movie_id (counting from 1 and so forth)

    // #endregion 

        // ! sort
    // #region

        //? sorts allows you to sort based on the column you choose — like title, runtime, or year released. So whenever you type the URL it would be something like so (example: /api/movie/sort/title). *title is the sorter
        //? ORDER BY will keep it in whatever order it will be sorted by. 

    // #endregion 

        //! findByGenre 

        //? findByGenre finds all movies that match a specific genre.
        //? The genre_id is passed through the URL (example: /api/movie/genre/3).
        //? It joins the movie, movie_to_genre, and genre tables to filter results  properly.

        // #endregion