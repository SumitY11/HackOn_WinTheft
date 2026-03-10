require("dotenv").config()

const mongoose = require("mongoose")

const connectDB = require("../config/db")

const Hospital = require("../models/Hospital")
const Bed = require("../models/Bed")
const Equipment = require("../models/Equipment")
const Patient = require("../models/Patient")

const seedData = async () => {

 try{

  await connectDB()

  // Clear existing data
  await Hospital.deleteMany()
  await Bed.deleteMany()
  await Equipment.deleteMany()
  await Patient.deleteMany()

  console.log("Old data cleared")

  // Create hospitals
  const hospitals = await Hospital.insertMany([
   {
    name:"AIIMS Delhi",
    location:"Delhi",
    latitude:28.5672,
    longitude:77.2100
   },
   {
    name:"Apollo Mumbai",
    location:"Mumbai",
    latitude:19.0760,
    longitude:72.8777
   },
   {
    name:"KIMS Hyderabad",
    location:"Hyderabad",
    latitude:17.3850,
    longitude:78.4867
   }
  ])

  console.log("Hospitals created")

  const beds = []

  // AIIMS ICU beds
  for(let i=1;i<=5;i++){
   beds.push({
    bedNumber:`AIIMS-ICU-${i}`,
    type:"ICU",
    hospital:hospitals[0]._id
   })
  }

  // AIIMS general beds
  for(let i=1;i<=10;i++){
   beds.push({
    bedNumber:`AIIMS-GEN-${i}`,
    type:"General",
    hospital:hospitals[0]._id
   })
  }

  // Apollo ICU beds
  for(let i=1;i<=3;i++){
   beds.push({
    bedNumber:`APOLLO-ICU-${i}`,
    type:"ICU",
    hospital:hospitals[1]._id
   })
  }

  await Bed.insertMany(beds)

  console.log("Beds created")

  // Equipment
  const equipment = [
   {
    name:"Ventilator-1",
    type:"Ventilator",
    hospital:hospitals[0]._id
   },
   {
    name:"Ventilator-2",
    type:"Ventilator",
    hospital:hospitals[1]._id
   },
   {
    name:"Ventilator-3",
    type:"Ventilator",
    hospital:hospitals[2]._id
   },
   {
    name:"Oxygen-1",
    type:"Oxygen",
    hospital:hospitals[0]._id
   },
   {
    name:"Oxygen-2",
    type:"Oxygen",
    hospital:hospitals[1]._id
   }
  ]

  await Equipment.insertMany(equipment)

  console.log("Equipment created")

  // Sample patients
  const patients = [
   {
    name:"Rahul Sharma",
    age:45,
    condition:"Cardiac Arrest",
    priority:"Critical",
    status:"Admitted",
    hospital:hospitals[0]._id
   },
   {
    name:"Priya Singh",
    age:32,
    condition:"Accident Trauma",
    priority:"High",
    status:"Admitted",
    hospital:hospitals[1]._id
   }
  ]

  await Patient.insertMany(patients)

  console.log("Patients created")

  console.log("Database seeded successfully")

  process.exit()

 }catch(err){

  console.error(err)

  process.exit(1)

 }

}

seedData()