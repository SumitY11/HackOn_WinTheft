export default function AlertsPanel(){

 const alerts=[
  "ICU capacity low at Apollo Mumbai",
  "Ventilator shortage predicted",
  "Critical patient surge detected"
 ]

 return(

 <div className="bg-white p-6 rounded shadow">

  <h2 className="text-lg font-semibold mb-4">
   System Alerts
  </h2>

  <ul className="space-y-3">

   {alerts.map((a,i)=>(
    <li key={i} className="text-red-500">
     ⚠ {a}
    </li>
   ))}

  </ul>

 </div>

 )

}