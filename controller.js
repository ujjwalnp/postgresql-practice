const pool = require('./db')
const queries = require('./queries')

const getHospitalData = (req, res) => {
    console.log('getHospitalData')
    pool.query(queries.getAllData, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getHospitalData
}
