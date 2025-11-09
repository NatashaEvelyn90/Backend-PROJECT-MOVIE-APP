//TODO Step 1: Connecting to the data/table 
//? Make sure to add your helper file as that is needed here as well 
const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const movieDao = {
    table: 'movie',

    findMovieInfo: (res, table)=> {
        
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

        // * Crazpicc's "Possible" SQL Translation notes below
        // #region
        // const sql = `
        // SELECT //! I want to SELECT all this data listed below:
        //     m.movie_id, m.title, m.rating, //? WE
        //     m.runtime, m.nationality, m.yr_released, //? ARE
        //     m.budget, m.gross, m.production_id, //? THE
        //     m.showing, m.poster, g.genre_id, g.genre //? DATA!
        // FROM movie m //! FROM the movie table (but I am also giving it a alias/nickname called "m" so now forth table wil be called m)
        // JOIN movie_to_genre USING (movie_id) //! I want to JOIN the movie_to_genre data USING the movie_id data. As there are movies that have genres!   
        // JOIN genre g USING (genre_id) //! I want to JOIN the genre table ( NEW alias: g) USING the genre_id data. I want to make sure the genres are listed.
        // ORDER BY m.movie_id;`;

        // #endregion

        con.query(sql, (error, rows)=> {
            queryAction(res, error, rows, table)
        })    
    }
};

module.exports = movieDao