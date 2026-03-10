const router = require("express").Router()

const {
 addPatient,
 getPatients,
 updatePatient
} = require("../controllers/patientController")

router.post("/",addPatient)

router.get("/",getPatients)

router.put("/:id",updatePatient)

module.exports = router