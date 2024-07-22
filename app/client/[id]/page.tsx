import CardWrapper from '@/app/ui/client/cards';
import { fetchBudgetDetailsData } from '@/app/lib/data';
import BarChart from '@/app/ui/client/budgetdetails/barchart';
import CardDetails from '@/app/ui/client/budgetdetails/carddetails';
import validatecookie from '../validatecookie';
import { cookies } from 'next/headers'
import dynamic from 'next/dynamic';
const ToggleContent = dynamic(() => import('@/app/ui/client/budgetdetails/togglecontent'), {
  ssr: false,
});

const formatNumberWithCommas = (number: number): string => {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};


export default async function Page({ params }: { params: { id: string }}) 
{
  const cookieStore = cookies()
  const sessid=cookieStore.get('PHPSESSID')
  validatecookie(sessid)
  const {
    output,
    totalOpening,
    totalClosing,
    totalBalance,
    totalInvoices,
  } = await fetchBudgetDetailsData(params.id,sessid);
console.log(output.details.tableData)
let count1=0
let netbal=0
let netspent=0
let nettotal=0
output.details.tableData?.map((table)=>{
  console.log(table.Category)
  if(table.Category?.includes("(01)")||table.Category?.includes("(02)")||table.Category?.includes("(03)")||table.Category?.includes("(04)")){
    count1=count1+1;
    netbal=netbal+(isNaN(Number(table.OpenBal.replace(/,/g, '')))?0:Number(table.OpenBal.replace(/,/g, '')))
    netspent=netspent+(isNaN(Number(table.Credit.replace(/,/g, '')))?0:Number(table.Credit.replace(/,/g, '')))
    nettotal=nettotal+(isNaN(Number(table.Close.replace(/,/g, '')))?0:Number(table.Close.replace(/,/g, '')))
  }
})

console.log(count1,netbal,netspent)
return(
  <main>
  <h1 className={`font-medium mb-4 text-xl md:text-2xl text-black`}>
  Budget Overview
  </h1>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <CardWrapper totalOpening={totalOpening} totalClosing={totalClosing} totalBalance={totalBalance} totalInvoices={totalInvoices}/>
  </div>
  <br/>
  <h1 className={` font-medium mb-4 text-xl md:text-2xl text-black`}>Budget Details</h1>

  { count1>1 ? (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <h1 className='text-lg bg-lightBlue-500 text-black'>Core Funding</h1>
      <div className=" gap-32 flex flex-wrap rounded-lg bg-gray-50 p-2 md:pt-2 justify-center md:justify-start">
      <BarChart balance={netbal} spent={netspent}/>
      <CardDetails total={nettotal} balance={netbal} spent={netspent}/>
      </div>
    </div>
  </div>
) : (<div></div>)
  }
<br></br>
<ToggleContent output={output} />
      
  </main>
 )
}
