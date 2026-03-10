const router = require("express").Router()

const {
 getNationalDashboard,
 getHospitalMapData
} = require("../controllers/nationalController")

router.get("/dashboard", getNationalDashboard)

router.get("/hospital-map", getHospitalMapData)

module.exports = router