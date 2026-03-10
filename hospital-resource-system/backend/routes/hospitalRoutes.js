const router = require("express").Router()

const {
 createHospital,
 getHospitals
} = require("../controllers/hospitalController")

router.post("/", createHospital)

router.get("/", getHospitals)

module.exports = router