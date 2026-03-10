import { useEffect,useState } from "react"
import API from "../services/api"

import PageContainer from "../components/layout/PageContainer"
import StatCard from "../components/dashboard/StatCard"
import ChartsPanel from "../components/dashboard/ChartsPanel"
import HospitalMap from "../components/HospitalMap"
import AlertsPanel from "../components/dashboard/AlertsPanel"

export default function Dashboard(){

 const [stats,setStats]=useState({})

 useEffect(()=>{
  API.get("/national/dashboard")
   .then(res=>setStats(res.data))
 },[])

 return(

 <PageContainer>

 <h1 className="text-3xl font-bold mb-8">
  National Healthcare Analytics
 </h1>

 <div className="grid grid-cols-3 gap-6 mb-10">

  <StatCard title="Hospitals" value={stats.totalHospitals} icon="🏥"/>
  <StatCard title="Patients" value={stats.totalPatients} icon="🧑"/>
  <StatCard title="Critical Cases" value={stats.criticalPatients} icon="⚠"/>
  <StatCard title="ICU Beds Available" value={stats.availableICUBeds} icon="🛏"/>
  <StatCard title="Ventilators" value={stats.ventilatorsAvailable} icon="🫁"/>
  <StatCard title="Oxygen Units" value={stats.oxygenUnitsAvailable} icon="🧪"/>

 </div>

 <div className="grid grid-cols-2 gap-8 mb-10">

  <ChartsPanel/>

  <AlertsPanel/>

 </div>

 <HospitalMap/>

 </PageContainer>

 )

}