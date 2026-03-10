export default function Sidebar(){

 return(

  <div className="w-64 h-screen bg-gray-900 text-white p-6">

   <h1 className="text-2xl font-bold mb-10">
    Health Command
   </h1>

   <ul className="space-y-4">

    <li className="hover:text-blue-400 cursor-pointer">
     Dashboard
    </li>

    <li className="hover:text-blue-400 cursor-pointer">
     Hospitals
    </li>

    <li className="hover:text-blue-400 cursor-pointer">
     Patients
    </li>

    <li className="hover:text-blue-400 cursor-pointer">
     Resources
    </li>

    <li className="hover:text-blue-400 cursor-pointer">
     Emergency Map
    </li>

   </ul>

  </div>

 )

}