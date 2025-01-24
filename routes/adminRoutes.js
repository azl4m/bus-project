const express = require("express")
const busController = require('../controllers/adminController/busController')
const placeController = require('../controllers/adminController/placeController')
const routeController = require('../controllers/adminController/routeController')
const router = express.Router()

router.get('/add-bus',busController.getAddBus)
router.get('/add-place',placeController.getAddPlace)
router.get('/add-route',routeController.getAddPlace)
module.exports = router