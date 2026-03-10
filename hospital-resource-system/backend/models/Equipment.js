const mongoose = require("mongoose")

const EquipmentSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 type:{
  type:String,
  enum:["Ventilator","Oxygen","ECG","Defibrillator","Monitor","Other"],
  required:true
 },

 status:{
  type:String,
  enum:["Available","InUse","Maintenance"],
  default:"Available"
 },

 assignedPatient:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Patient",
  default:null
 }

},{
 timestamps:true
})

module.exports = mongoose.model("Equipment",EquipmentSchema)