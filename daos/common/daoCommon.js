//TODO STEP 1: connecting to the database. To do that, we must connect/import with our dbconfig file that we created.
//? This daoCommon file is what all the tables are able to use. It is not just for one specific table 
const connect = require('../../config/dbconfig')

const daoCommon = {
    //! In here, we will be writing the code that will connect us to the database 
    //? FindAll will access everything in the database. (req, res, table) in this means we are sending a request, for a response, for a table. 
    findAll: (req, res, table) => {

        //? The .query will have two arguments. The first one will be with SQL and the second one will be a callback function. 
        connect.query(
            //! This is the SQL Query/Argument!
            `SELECT * FROM ${table};`, //* Translation: Select all the data from the table

            //! The is the callback function! 
            (error, rows)=> {
                if (!error) { //* Translation: if NO error...
                    if (rows.length === 1) { //*Translation: if there is only 1 item in the table...
                        res.json(...rows) //* Translation: We are going to remove/spread out the [] from the data
                    }else {
                        res.json(rows) //* Translation: keep them brackets []
                    } 
                } else { //* Translation: If there IS an error...
                    console.log(`DAO ERROR: ${error}`) //* Translation:
                    res.json({
                        "message": 'error',
                        "table": `${table}`,
                        "error": error
                    })
                }
            } 
        )
    }
}

module.exports = daoCommon