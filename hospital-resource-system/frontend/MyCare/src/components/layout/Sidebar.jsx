import { Link } from "react-router-dom"

export default function Sidebar(){

 return(

 <div className="w-64 h-screen bg-blue-900 text-white p-6">

  <h1 className="text-2xl font-bold mb-10">
   Health Analytics
  </h1>

  <nav className="flex flex-col gap-6">

   <Link to="/" className="hover:text-blue-200">
    Dashboard
   </Link>

   <Link to="/hospitals" className="hover:text-blue-200">
    Hospitals
   </Link>

   <Link to="/patients" className="hover:text-blue-200">
    Patients
   </Link>

   <Link to="/resources" className="hover:text-blue-200">
    Resources
   </Link>

   <Link to="/map" className="hover:text-blue-200">
    Emergency Map
   </Link>

  </nav>

 </div>

 )

}