//TODO Step 1: Gotta setup as usual
const express = require('express')
const router = express.Router()

//! What we are doing here is pulling movieDao information and calling it "dao". Anytime we type Dao, we are talking about the movieDao.js file. We will be having more files similar to this. This is called "destructuring"
const {movieDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/movie = lists all the movies
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/movie/sort =  sort by title, runtime, yr_released etc
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/movie/genre/genreName = sort by genre_id OR genre itself ('comedy')
router.get('/genre/:genre', (req, res)=> {
    dao.findByGenre(res, dao.table, req.params.genre)
}) 

//? http://localhost:8064/api/movie/:id  = search by movie_id. 
//! Id needs to be at the bottom instead because if sort is at the bottom, it would try to sort by id and we don't want that. Also instead of listing the word ID you would choose a number
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! http://localhost:8064/api/movie/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
}) 

//! http://localhost:80064/api/movie/update  
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

//! Don't forget to export! 
module.exports = router

