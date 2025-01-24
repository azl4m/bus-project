const express = require("express")
const busController = require('../controllers/adminController/bus')

const router = express.Router()

router.get('/add-bus',busController.addBus)

module.exports = router