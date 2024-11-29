const pool = require('./db')

const getUsers = (req, res) => {
    console.log('getUsers')
    pool.query('SELECT * FROM tlbPatient ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers
}
