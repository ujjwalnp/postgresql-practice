const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get('/users', controller.getHospitalData)

module.exports = router