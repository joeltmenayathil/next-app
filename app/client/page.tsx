import Pagination from '@/app/ui/client/pagination';
import Search from '@/app/ui/client/search';
import Table from '@/app/ui/client/table';
import { fetchTotalClientPages } from '@/app/lib/data';
import { Metadata } from 'next';
import validatecookie from './validatecookie';
import { cookies } from 'next/headers'


export const metadata: Metadata = {
  title: 'Clients',
};


export default async function Page({ searchParams
}: {
  searchParams?: {
    page?: string;
    query?: string;
  },
}) 
{
  const cookieStore = cookies()
  const sessid=cookieStore.get('PHPSESSID')
  validatecookie(sessid)
  const con_id=cookieStore.get('CON_Id')
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  const totalPages = await fetchTotalClientPages(query,sessid,con_id);
  const safeTotalPages: number = totalPages || 1;

  return (
    <main>
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Clients</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Clients ..." />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Table query={query} currentPage={currentPage} sessid={sessid} con_id={con_id}/>
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={safeTotalPages} />
      </div>
    </div>
    </main>
  );
}
