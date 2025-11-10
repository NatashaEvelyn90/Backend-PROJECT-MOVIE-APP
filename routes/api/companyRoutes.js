const router = require('express').Router()

const {companyDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/company = show full list of companies
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/company/movies/:production = search productions by using the id
router.get('/movies/:production', (req, res)=> {
    dao.findMoviesByProduction(res, dao.table, req.params.production)
})

// //? http://localhost:8064/api/company/sort = sort by production or production_id it will be in alphabetical order by production
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// //? http://localhost:8064/api/company/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 