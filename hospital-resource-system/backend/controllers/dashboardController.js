const Patient = require("../models/Patient")
const Bed = require("../models/Bed")
const Equipment = require("../models/Equipment")

exports.getStats = async (req,res)=>{

 try{

  const totalPatients = await Patient.countDocuments()

  const criticalPatients = await Patient.countDocuments({
   priority:"Critical"
  })

  const availableBeds = await Bed.countDocuments({
   status:"Available"
  })

  const availableEquipment = await Equipment.countDocuments({
   status:"Available"
  })

  res.json({
   totalPatients,
   criticalPatients,
   availableBeds,
   availableEquipment
  })

 }catch(err){

  res.status(500).json({error:err.message})

 }

}