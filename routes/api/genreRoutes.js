const router = require('express').Router()

const {genreDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/genre 
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/genre/movies/:id 
router.get('/movies/:id', (req, res)=> {
    dao.findMoviesByGenre(res, dao.table, req.params.id)
})

//? http://localhost:8064/api/genre/sort 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/genre/:id  
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 