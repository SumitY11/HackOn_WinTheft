export default function Navbar(){

 return(

 <div className="h-16 bg-white border-b flex items-center justify-between px-6">

  <input
   placeholder="Search hospitals..."
   className="border rounded px-4 py-2 w-80"
  />

  <div className="flex items-center gap-6">

   <span className="text-gray-600 cursor-pointer">
    🔔 Alerts
   </span>

   <span className="font-semibold">
    Admin
   </span>

  </div>

 </div>

 )

}