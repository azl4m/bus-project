const express = require("express")
const busController = require('../controllers/userControllers/busController')
const taxiController = require("../controllers/userControllers/taxiController")

const router = express.Router()

router.get('/',busController.busSearch)
router.get("/auto-taxi",taxiController.getTaxiPage)
router.get("/busResult",busController.resultBus)

module.exports = router