const express = require("express")
const busController = require('../controllers/userControllers/busController')

const router = express.Router()

router.get('/',busController.busSearch)

module.exports = router