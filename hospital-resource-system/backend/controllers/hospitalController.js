const Hospital = require("../models/Hospital")

exports.createHospital = async (req,res)=>{

 try{

  const hospital = new Hospital(req.body)

  await hospital.save()

  res.status(201).json(hospital)

 }catch(err){

  res.status(500).json({error:err.message})

 }

}

exports.getHospitals = async (req,res)=>{

 try{

  const hospitals = await Hospital.find()

  res.json(hospitals)

 }catch(err){

  res.status(500).json({error:err.message})

 }

}