const Equipment = require("../models/Equipment")

exports.createEquipment = async (req,res)=>{
 try{
  const equipment = new Equipment(req.body)
  await equipment.save()
  res.status(201).json(equipment)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getEquipment = async (req,res)=>{
 try{
  const equipment = await Equipment.find().populate("assignedPatient")
  res.json(equipment)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.updateEquipment = async (req,res)=>{
 try{
  const equipment = await Equipment.findByIdAndUpdate(
   req.params.id,
   req.body,
   {new:true}
  )
  res.json(equipment)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}