const router = require("express").Router()

const { routeEmergency } = require("../controllers/emergencyController")

router.post("/route", routeEmergency)

module.exports = router