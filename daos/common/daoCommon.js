const connect = require('../../config/dbconfig')
const{ queryAction} = require('../../helpers/queryAction')

const daoCommon = {

    //! New Method using the queryAction helper 
    //? This is a shorter and cleaner way. If you want to see the old way, check the bootom of this code. 
    findAll: (res, table)=> {
        connect.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

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

    //! New Method of using queryAction for Sorting
    //? Lets sort with clean code
    sort: (res, table, sorter)=> {
        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=>{
                queryAction(res, error, rows, table)
            }
        )
    },  

    //! This is how you will add more of anything(movies, directors, etc) POST
    create: (req, res, table) => {

        //! request.body =>{} 
        if(Object.keys(req.body).length === 0) { //Object must be capitalized
            //! Object.keys(obj) => array of keys
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)
            //* exectute can take 3 arguments, query can only take 2 arguments

            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ? ;`,
                values,
                (error, dbres)=> {
                    if(!error){
                        
                        console.log(dbres)
                        res.render('pages/success', {
                            title: 'Thank You.',
                            name: 'Success'
                        })
                    } else {
                        console.log(`${table} Dao error: `, error)
                    }
                }
            )
        }
    },

    //! if we mess up, we can fix our issue PATCH
    update: (req, res, table) => {
        // first, we would need to check to see if the id is equal to a number. id == number
        if(isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? 
                    WHERE ${table}_id = ?`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if(!error) {
                        // res.send(`Changed${dbres.changedRows} row(s)`)
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    } else {
                        res.json({
                            "error": true,
                            "message": error
                        })
                    }
                }    
            )
        }
    }
}

module.exports = daoCommon

//! Crazpicc's notes for DaoCommon.js
// #region
//TODO STEP 1: connecting to the database. To do that, we must connect/import with our dbconfig file that we created.
//? This daoCommon file is what all the tables are able to use. It is not just for one specific table 
//TODO extra: Importing helper file 

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

// #endregion