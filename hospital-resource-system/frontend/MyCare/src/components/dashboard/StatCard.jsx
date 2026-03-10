export default function StatCard({title,value,icon}){

 return(

 <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">

  <div>

   <p className="text-gray-500 text-sm">
    {title}
   </p>

   <h2 className="text-3xl font-bold">
    {value ?? 0}
   </h2>

  </div>

  <div className="text-3xl">
   {icon}
  </div>

 </div>

 )

}