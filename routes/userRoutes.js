const express = require("express")
const busController = require('../controllers/userControllers/busController')
const taxiController = require("../controllers/userControllers/taxiController")

const router = express.Router()
//bus
router.get('/',busController.busSearch)
router.post("/search-bus",busController.postSearchBus)
router.post("/check-bus-search",busController.checkBusSearch)
//taxi
router.get("/auto-taxi",taxiController.getTaxiPage)

//busresult
router.get("/busResult",busController.resultBus)

module.exports = router