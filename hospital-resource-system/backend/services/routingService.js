const Hospital = require("../models/Hospital")
const Bed = require("../models/Bed")


exports.findNearestHospitalWithICU = async (latitude, longitude) => {

 const hospitals = await Hospital.find()

 let nearestHospital = null
 let minDistance = Infinity

 for(const hospital of hospitals){

  const icuBeds = await Bed.countDocuments({
   hospital: hospital._id,
   type: "ICU",
   status: "Available"
  })

  if(icuBeds > 0){

   const distance = Math.sqrt(
    Math.pow(latitude - hospital.latitude,2) +
    Math.pow(longitude - hospital.longitude,2)
   )

   if(distance < minDistance){
    minDistance = distance
    nearestHospital = hospital
   }

  }

 }

 return nearestHospital

}