const Bed = require("../models/Bed")

exports.createBed = async (req,res)=>{

 try{

  const bed = new Bed(req.body)

  await bed.save()

  res.status(201).json(bed)

 }catch(err){

  res.status(500).json({error:err.message})

 }

}

exports.getBeds = async (req,res)=>{

 try{

  const beds = await Bed.find().populate("assignedPatient")

  res.json(beds)

 }catch(err){

  res.status(500).json({error:err.message})

 }

}

exports.updateBed = async (req,res)=>{

 try{

  const bed = await Bed.findByIdAndUpdate(
   req.params.id,
   req.body,
   {new:true}
  )

  res.json(bed)

 }catch(err){

  res.status(500).json({error:err.message})

 }

}