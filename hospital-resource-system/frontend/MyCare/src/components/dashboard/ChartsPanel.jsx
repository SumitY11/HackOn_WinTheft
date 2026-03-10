import {
 Chart as ChartJS,
 ArcElement,
 Tooltip,
 Legend,
 CategoryScale,
 LinearScale,
 BarElement
} from "chart.js"

import { Pie, Bar } from "react-chartjs-2"
import { useEffect,useState } from "react"
import API from "../../services/api"

ChartJS.register(
 ArcElement,
 Tooltip,
 Legend,
 CategoryScale,
 LinearScale,
 BarElement
)

export default function ChartsPanel(){

 const [data,setData]=useState(null)

 useEffect(()=>{
  API.get("/national/dashboard")
   .then(res=>setData(res.data))
 },[])

 if(!data) return null

 const bedData={
  labels:["ICU Beds","General Beds"],
  datasets:[{
   data:[
    data.availableICUBeds,
    data.availableGeneralBeds
   ],
   backgroundColor:["#ef4444","#3b82f6"]
  }]
 }

 const equipmentData={
  labels:["Ventilators","Oxygen Units"],
  datasets:[{
   data:[
    data.ventilatorsAvailable,
    data.oxygenUnitsAvailable
   ],
   backgroundColor:["#10b981","#f59e0b"]
  }]
 }

 return(

 <div className="grid grid-cols-2 gap-6">

  <div className="bg-white p-6 rounded shadow">

   <h3 className="mb-4 font-semibold">
    Bed Availability
   </h3>

   <Pie data={bedData}/>

  </div>

  <div className="bg-white p-6 rounded shadow">

   <h3 className="mb-4 font-semibold">
    Equipment Availability
   </h3>

   <Bar data={equipmentData}/>

  </div>

 </div>

 )

}