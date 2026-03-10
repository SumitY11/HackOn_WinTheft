const { findNearestHospitalWithICU } = require("../services/routingService")

exports.routeEmergency = async (req,res) => {

 try{

  const { latitude, longitude } = req.body

  const hospital = await findNearestHospitalWithICU(latitude, longitude)

  if(!hospital){
   return res.json({
    message:"No nearby hospitals with ICU beds available"
   })
  }

  res.json({
   hospitalName: hospital.name,
   location: hospital.location,
   latitude: hospital.latitude,
   longitude: hospital.longitude
  })

 }catch(err){

  res.status(500).json({error:err.message})

 }

}