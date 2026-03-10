const mongoose = require("mongoose")

const BedSchema = new mongoose.Schema({

 bedNumber:{
  type:String,
  required:true,
  unique:true
 },

 type:{
  type:String,
  enum:["ICU","General"],
  required:true
 },

 status:{
  type:String,
  enum:["Available","Occupied"],
  default:"Available"
 },

 assignedPatient:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Patient",
  default:null
 }

})

module.exports = mongoose.model("Bed",BedSchema)