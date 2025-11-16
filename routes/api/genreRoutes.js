const router = require('express').Router()
const {genreDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/genre = show full list of Genres
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/genre/movies/:genre = search movies by typing in the genre itself aka comedy, western
router.get('/movies/:genre', (req, res)=> {
    dao.findMoviesByGenre(res, dao.table, req.params.genre)
})

//? http://localhost:8064/api/genre/sort = sort by genre or genre_id (this will be great when you start to add more in the future)
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/genre/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! http://localhost:8064/api/genre/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

//! http://localhost:80064/api/genre/update  
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 