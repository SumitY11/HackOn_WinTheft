const router = require("express").Router()

const {
 createEquipment,
 getEquipment,
 updateEquipment
} = require("../controllers/equipmentController")

router.post("/", createEquipment)

router.get("/", getEquipment)

router.put("/:id", updateEquipment)

module.exports = router