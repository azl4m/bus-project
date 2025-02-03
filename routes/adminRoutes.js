const express = require("express")
const busController = require('../controllers/adminController/busController')
const placeController = require('../controllers/adminController/placeController')
const routeController = require('../controllers/adminController/routeController')
const router = express.Router()

//bus
router.get('/add-bus',busController.getAddBus)
router.post('/add-bus',busController.postAddBus)
//place
router.get('/add-place',placeController.getAddPlace)
router.post('/add-place',placeController.postAddPlace)
router.get("/edit-place",placeController.getAllPlaces)
router.post("/edit-place/:id/delete",placeController.postDeletePlace)
router.post("/edit-place/:id/edit",placeController.postEditPlace)
//route
router.get('/add-route',routeController.getAddRoute)
router.post('/add-route',routeController.postAddRoute)
router.get("/route",routeController.getAllRoutes)
router.get("/edit-route/:id",routeController.getEditRoute)
module.exports = router