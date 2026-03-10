const router = require("express").Router()

const {
 createPatient,
 getPatients,
 updatePatient
} = require("../controllers/patientController")

router.post("/", createPatient)

router.get("/", getPatients)

router.put("/:id", updatePatient)

module.exports = router