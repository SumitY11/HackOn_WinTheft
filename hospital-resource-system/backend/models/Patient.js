const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 age:Number,

 condition:String,

 status:{
  type:String,
  default:"Admitted"
 },

 priority:{
  type:String,
  enum:["Low","Medium","High","Critical"]
 },

 assignedBed:{
  type:String,
  default:null
 },

 admittedAt:{
  type:Date,
  default:Date.now
 }

})

module.exports = mongoose.model("Patient",PatientSchema)