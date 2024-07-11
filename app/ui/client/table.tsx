import Image from 'next/image';
// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchBudgetData } from '@/app/lib/data';
import Link from 'next/link';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface Client {
    id: string;
    name: string;
    selected: string;
    srvid: string;
    }

export default async function ClientTable(
    {
  query,
  currentPage,
  sessid,
  con_id

}: {
  query: string,
  currentPage: number;
  sessid: RequestCookie | undefined,
  con_id: RequestCookie | undefined
}
) {
    currentPage?currentPage:0
  const clients= await fetchBudgetData(query,currentPage,sessid,con_id);
  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="flex flex-wrap rounded-lg bg-gray-50 p-2 md:pt-2">
            {clients?.map((client: Client) => (              
              <div
                key={client.id}
                className={"w-full md:w-1/3 mb-2 rounded-md bg-white p-4 hover:bg-slate-200 hover:text-slate-600 "}>
                <div className="flex items-center justify-between border-b pb-4">
                    <div className="mb-2 flex items-center">
                    <Link key={client.id} href={`/client/${client.srvid}`} >
                        <p>{client.name}</p>
                    </Link>
                    </div>
                </div>
              </div>
            
        ))}
        </div>
      </div>
    </div>
  );
}
