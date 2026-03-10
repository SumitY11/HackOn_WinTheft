const Hospital = require("../models/Hospital")
const Patient = require("../models/Patient")
const Bed = require("../models/Bed")
const Equipment = require("../models/Equipment")

// NATIONAL DASHBOARD
exports.getNationalDashboard = async (req,res)=>{

 try{

  const totalHospitals = await Hospital.countDocuments()

  const totalPatients = await Patient.countDocuments()

  const criticalPatients = await Patient.countDocuments({
   priority:"Critical"
  })

  const totalBeds = await Bed.countDocuments()

  const availableICUBeds = await Bed.countDocuments({
   type:"ICU",
   status:"Available"
  })

  const availableGeneralBeds = await Bed.countDocuments({
   type:"General",
   status:"Available"
  })

  const ventilatorsAvailable = await Equipment.countDocuments({
   type:"Ventilator",
   status:"Available"
  })

  const oxygenUnitsAvailable = await Equipment.countDocuments({
   type:"Oxygen",
   status:"Available"
  })

  const hospitals = await Hospital.find()

  const alerts = []

  for(const hospital of hospitals){

   const totalHospitalBeds = await Bed.countDocuments({
    hospital:hospital._id
   })

   const availableBeds = await Bed.countDocuments({
    hospital:hospital._id,
    status:"Available"
   })

   if(totalHospitalBeds > 0){

    const capacity = (availableBeds / totalHospitalBeds) * 100

    if(capacity < 20){
     alerts.push(`⚠ ICU capacity low at ${hospital.name}`)
    }

   }

  }

  res.json({
   totalHospitals,
   totalPatients,
   criticalPatients,
   totalBeds,
   availableICUBeds,
   availableGeneralBeds,
   ventilatorsAvailable,
   oxygenUnitsAvailable,
   alerts
  })

 }catch(err){

  res.status(500).json({error:err.message})

 }

}


// HOSPITAL MAP DATA
exports.getHospitalMapData = async (req,res)=>{

 try{

  const hospitals = await Hospital.find()

  const mapData = []

  for(const hospital of hospitals){

   const totalBeds = await Bed.countDocuments({
    hospital: hospital._id
   })

   const availableBeds = await Bed.countDocuments({
    hospital: hospital._id,
    status:"Available"
   })

   const icuAvailable = await Bed.countDocuments({
    hospital: hospital._id,
    type:"ICU",
    status:"Available"
   })

   const ventilators = await Equipment.countDocuments({
    hospital: hospital._id,
    type:"Ventilator",
    status:"Available"
   })

   let loadStatus = "Green"

   if(availableBeds === 0){
    loadStatus = "Red"
   }
   else if((availableBeds/totalBeds) < 0.3){
    loadStatus = "Yellow"
   }

   mapData.push({
    hospitalId: hospital._id,
    name: hospital.name,
    location: hospital.location,
    latitude: hospital.latitude,
    longitude: hospital.longitude,
    totalBeds,
    availableBeds,
    icuAvailable,
    ventilators,
    loadStatus
   })

  }

  res.json(mapData)

 }catch(err){

  res.status(500).json({error:err.message})

 }

}