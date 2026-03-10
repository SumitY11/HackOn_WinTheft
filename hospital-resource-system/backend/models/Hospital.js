const mongoose = require("mongoose")

const HospitalSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 location:{
  type:String,
  required:true
 },

 latitude:Number,

 longitude:Number,

 totalBeds:{
  type:Number,
  default:0
 },

 availableBeds:{
  type:Number,
  default:0
 },

 emergencyLevel:{
  type:String,
  enum:["Low","Medium","High","Critical"],
  default:"Low"
 }

},{timestamps:true})

module.exports = mongoose.model("Hospital",HospitalSchema)