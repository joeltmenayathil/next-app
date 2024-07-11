import CardWrapper from '@/app/ui/client/cards';
import { Suspense } from 'react';
import {CardsSkeleton} from '@/app/ui/skeletons';
import { fetchBudgetDetailsData } from '@/app/lib/data';
import PieChart from '@/app/ui/client/budgetdetails/piechart';
import CardDetails from '@/app/ui/client/budgetdetails/carddetails';
import CardDetails2 from '@/app/ui/client/budgetdetails/carddetails2';
import ButtonWithModal from '@/app/ui/client/budgetdetails/invoicebutton';
import { NextResponse, NextRequest } from 'next/server';
import validatecookie from '../validatecookie';
import { cookies } from 'next/headers'


export default async function Page({ params, req, res }: { params: { id: string },  req : NextRequest,
  res : NextResponse }) 
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


return(
  <main>
  <h1 className={`font-medium mb-4 text-xl md:text-2xl`}>
  Budget Overview
  </h1>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <Suspense fallback={<CardsSkeleton />}>
    <CardWrapper totalOpening={totalOpening} totalClosing={totalClosing} totalBalance={totalBalance} totalInvoices={totalInvoices}/>
  </Suspense>
  </div>
  <br/>
  <h1 className={` font-medium mb-4 text-xl md:text-2xl`}>Budget Details</h1>
  {output.details.tableData?.map((table)=>{
    let balance = Number(table.OpenBal.replace(/,/g, ''))
    let spent = Number(table.Credit.replace(/,/g, ''))
    let total = Number(table.Close.replace(/,/g, ''))
    let actual = Number(table.Act.replace(/%/g, ''))
    let projected = Number(table.Pro.replace(/%/g, ''))
    let variations = Number(table.Var.replace(/%/g, ''))
    balance=isNaN(balance)?0:balance
    spent=isNaN(spent)?0:spent
    total=isNaN(total)?0:total
    actual=isNaN(actual)?0:actual
    projected=isNaN(projected)?0:projected
    variations=isNaN(variations)?0:variations
    let invdata=table.INV_Data
    
    return (
    <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <h1 className='text-lg bg-lightBlue-500'>{table.Category}</h1>
      <div className=" gap-10 flex flex-wrap rounded-lg bg-gray-50 p-2 md:pt-2 justify-center md:justify-start">
      <PieChart balance={balance} spent={spent}/>
      <CardDetails total={total} balance={balance} spent={spent}/>
      <CardDetails2 actual={actual} projected={projected} variations={variations}/>
      <div className='hidden md:block rounded-2xl shadow-lg md:flex-col flex-row space-y-0 space-x-4 items-center md:space-y-4 md:space-x-0 p-4 md:pt-40'>
      <ButtonWithModal tableData={invdata}></ButtonWithModal>
      </div>
      </div>
    </div>
  </div>
)
})}
      
  </main>
 )
}
