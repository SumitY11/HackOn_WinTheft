const router = require("express").Router()

const {
 createBed,
 getBeds,
 updateBed
} = require("../controllers/bedController")

router.post("/", createBed)

router.get("/", getBeds)

router.put("/:id", updateBed)

module.exports = router