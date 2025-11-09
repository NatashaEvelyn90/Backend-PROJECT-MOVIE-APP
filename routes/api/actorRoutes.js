const router = require('express').Router()

const {actorDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/actor = Full list of Actors
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/actor/movies/:id = put movies/ id of the actor and then it should show what movie they were in
router.get('/movies/:id', (req, res)=> {
    dao.findActorMovies(res, dao.table, req.params.id)
})

//? http://localhost:8064/api/actor/sort = sort by first_name or last_name. Possible img_url but at this time not yet
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/actor/:id  = search by their actor_id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 