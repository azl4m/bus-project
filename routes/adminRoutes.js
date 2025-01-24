const express = require("express")
const busController = require('../controllers/adminController/busController')
const placeController = require('../controllers/adminController/placeController')
const routeController = require('../controllers/adminController/routeController')
const router = express.Router()

//bus
router.get('/add-bus',busController.getAddBus)

//place
router.get('/add-place',placeController.getAddPlace)
// router.post('/add-place',placeController.postAddPlace)

//route
router.get('/add-route',routeController.getAddRoute)
module.exports = router