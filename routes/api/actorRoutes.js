const router = require('express').Router()

const {actorDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/actor 
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/actor/movies/:id 
router.get('/movies/:id', (req, res)=> {
    dao.findActorMovies(res, dao.table, req.params.id)
})

//? http://localhost:8064/api/actor/sort 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/actor/:id  
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 