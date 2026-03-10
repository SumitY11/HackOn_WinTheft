import Navbar from "./Navbar"

export default function PageContainer({children}){

 return(

 <div className="flex-1 bg-gray-100 min-h-screen">

  <Navbar/>

  <div className="p-8">

   {children}

  </div>

 </div>

 )

}