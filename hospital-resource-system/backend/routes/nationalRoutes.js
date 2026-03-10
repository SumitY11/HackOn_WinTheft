const router = require("express").Router()

const { getNationalDashboard } = require("../controllers/nationalController")

router.get("/dashboard", getNationalDashboard)

module.exports = router