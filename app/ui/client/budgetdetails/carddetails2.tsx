export default async function CardDetails2(
    {actual, projected, variations}:
    {actual: number,
     projected: number,
     variations: number,
  }
   ) {
   return (
     <>
     <div className="bg-gray-100 rounded-3xl shadow-lg flex md:flex-col flex-row space-y-0 space-x-4 items-center md:space-y-4 md:space-x-0 p-4 md:pt-16">
     <div className="bg-slate-500 text-white p-4 w-24 h-16 rounded-lg shadow-lg flex flex-col justify-center items-center">
       <h2 className="text-md font-semibold mb-1">Actual</h2>
       <p className="text-md ">{actual}%</p>
     </div>
     <div className="bg-slate-500 text-white p-4 w-24 h-16 rounded-lg shadow-lg flex flex-col justify-center items-center">
       <h2 className="text-md font-semibold mb-1">Projected</h2>
       <p className="text-md ">{projected}%</p>
     </div>
     <div className="bg-slate-500 text-white p-4 w-24 h-16 rounded-lg shadow-lg flex flex-col justify-center items-center">
       <h2 className="text-md font-semibold mb-1">Variations</h2>
       <p className="text-md ">{variations}%</p>
     </div>
   </div>

     </>
   );
 }
