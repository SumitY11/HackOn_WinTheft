import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import API from "../services/api"

export default function HospitalMap(){

 const [hospitals,setHospitals] = useState([])

 useEffect(()=>{

  API.get("/national/hospital-map")
   .then(res => setHospitals(res.data))

 },[])

 return(

  <MapContainer
   center={[20.5937,78.9629]}
   zoom={5}
   style={{height:"500px",width:"100%"}}
  >

   <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />

   {hospitals.map((hospital)=>(
    
    <Marker
     key={hospital.hospitalId}
     position={[hospital.latitude,hospital.longitude]}
    >

     <Popup>

      <b>{hospital.name}</b>

      <br/>

      Beds Available: {hospital.availableBeds}

      <br/>

      ICU Beds: {hospital.icuAvailable}

      <br/>

      Ventilators: {hospital.ventilators}

     </Popup>

    </Marker>

   ))}

  </MapContainer>

 )

}