import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  
  const iconMap = {
    totalOpening: BanknotesIcon,
    totalClosing: UserGroupIcon,
    totalBalance: ClockIcon,
    totalInvoices: InboxIcon,
  };

  const formatNumberWithCommas = (number: number): string => {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  
  export default async function CardWrapper({totalOpening, totalClosing, totalBalance, totalInvoices}:
    {totalOpening: number,
     totalClosing: number,
     totalBalance: number,
     totalInvoices: number 
      }) {
    return (
      <>
        <Card title="Total Opening" value={totalOpening} type="totalOpening" />
        <Card title="Total Spent" value={totalClosing} type="totalClosing" />
        <Card title="Total Balance" value={totalBalance} type="totalBalance" />
        <Card
          title="Total Invoices" value={totalInvoices} type="totalInvoices" />
      </>
    );
  }

  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number;
    type: 'totalInvoices' | 'totalClosing' | 'totalBalance' | 'totalOpening';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium text-black">{title}</h3>
        </div>
        <p className={`truncate rounded-xl bg-white px-4 py-8 text-center text-xl text-black`} >
        {type!='totalInvoices'?formatNumberWithCommas(value):value}
        </p>
      </div>
    );
  }
  