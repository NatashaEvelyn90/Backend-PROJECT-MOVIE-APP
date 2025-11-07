//TODO Step 1 import the daoCommon file. Need the basic block first
const daoCommon = require('./common/daoCommon')

//TODO Step 2 create categories where you will be having for each table 
//! Watch pt 3 47m mark to try to understand again 
const movieDao = {
    ...daoCommon, 
    ...require('./api/movieDao')
}

//! MAKE SURE YOU EXPORT!!!
module.exports = {
    movieDao
}