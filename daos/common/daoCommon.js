//TODO STEP 1: connecting to the database. To do that, we must connect/import with our dbconfig file that we created.
//? This daoCommon file is what all the tables are able to use. It is not just for one specific table 
const connect = require('../../config/dbconfig')

//TODO extra: Importing helper file 
const{ queryAction} = require('../../helpers/queryAction')

const daoCommon = {

    //! New Method using the queryAction helper 
    //? This is a shorter and cleaner way 
    findAll: (req, res, table)=> {
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    
    //* Old Method way of creating/using the FindAll (Notes included) 
    // #region

    //! In here, we will be writing the code that will connect us to the database 
    //? FindAll will access everything in the database. (req, res, table) in this means we are sending a request, for a response, for a table. 
    // findAll: (req, res, table) => {

    //     //? The .query will have two arguments. The first one will be with SQL and the second one will be a callback function. 
    //     connect.query(
    //         //! This is the SQL Query/Argument!
    //         `SELECT * FROM ${table};`, //* Translation: Select all the data from the table

    //         //! The is the callback function! 
    //         (error, rows)=> {
    //             if (!error) { //* Translation: if NO error...
    //                 if (rows.length === 1) { //*Translation: if there is only 1 item in the table...
    //                     res.json(...rows) //* Translation: We are going to remove/spread out the [] from the data
    //                 }else {
    //                     res.json(rows) //* Translation: keep them brackets []
    //                 } 
    //             } else { //* Translation: If there IS an error...
    //                 console.log(`DAO ERROR: ${error}`) //* Translation:
    //                 res.json({
    //                     "message": 'error',
    //                     "table": `${table}`,
    //                     "error": error
    //                 })
    //             }
    //         } 
    //     )
    // },
    // #endregion

    //! New Method using queryAction for finding Id
    //? Lean and clean code  
    findById: (res, table, id)=> {
        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },


    //* Old Method way of creating/using the "Finding things by ID" (Notes included)
    // #region

    // findById: (res, table, id) =>{ //* Translation: Needing a response from the table to show/find the ids. 
    //     connect.query(
    //         `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
    //         (error, rows)=> {
    //             if (!error) {
    //                 res.json(...rows)
    //             }else {
    //                 console.log(`DAO ERROR: ${error}`)
    //                 res.json({
    //                     "message": 'error',
    //                     "table": `${table}`,
    //                     "error": error
    //                 })
    //             }
    //         }
    //     )
    // },
    // #endregion

    //! New Method of using queryAction for Sorting
    //? Lets sort with clean code
    sort: (res, table, sorter)=> {
        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=>{
                queryAction(res, error, rows, table)
            }
        )
    }  


    //* Old Method way of Sorting things (Notes included)
    // #region

    // sort: (res, table, sorter) => { //* Translation: Needing a response from the table so that we can sort things
    //     connect.query(
    //         `SELECT * FROM ${table} ORDER BY ${sorter};`, 
    //         (error, rows)=> {
    //             if (!error) {
    //                 if (rows.length == 1) {
    //                     res.json(...rows)
    //                 } else {
    //                     res.json(rows)
    //                 }
    //             }else {
    //                 console.log(`DAO ERROR: ${error}`)
    //                 res.json({
    //                     "message": 'error',
    //                     "table": `${table}`,
    //                     "error": error
    //                 })
    //             }
    //         }
    //     )
    // } 
    // #endregion
}

module.exports = daoCommon