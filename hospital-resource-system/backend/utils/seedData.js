require("dotenv").config()

const mongoose = require("mongoose")
const connectDB = require("../config/db")

const Bed = require("../models/Bed")
const Equipment = require("../models/Equipment")

const seedData = async () => {

 try{

  await connectDB()

  // clear existing data
  await Bed.deleteMany()
  await Equipment.deleteMany()

  const beds = []

  // 5 ICU beds
  for(let i=1;i<=5;i++){
   beds.push({
    bedNumber:`ICU-${i}`,
    type:"ICU"
   })
  }

  // 10 general beds
  for(let i=1;i<=10;i++){
   beds.push({
    bedNumber:`GEN-${i}`,
    type:"General"
   })
  }

  await Bed.insertMany(beds)

  const equipment = [
   {name:"Ventilator-1", type:"Ventilator"},
   {name:"Ventilator-2", type:"Ventilator"},
   {name:"Ventilator-3", type:"Ventilator"},

   {name:"Oxygen-1", type:"Oxygen"},
   {name:"Oxygen-2", type:"Oxygen"},
   {name:"Oxygen-3", type:"Oxygen"}
  ]

  await Equipment.insertMany(equipment)

  console.log("Test data seeded successfully")

  process.exit()

 }catch(err){

  console.error(err)

  process.exit(1)

 }

}

seedData()