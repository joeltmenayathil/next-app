'use client';

import React, { useState } from 'react';
import BarChart from '@/app/ui/client/budgetdetails/barchart';
import CardDetails from '@/app/ui/client/budgetdetails/carddetails';
import CardDetails2 from '@/app/ui/client/budgetdetails/carddetails2';
import ButtonWithModal from '@/app/ui/client/budgetdetails/invoicebutton';

interface ToggleContentProps {
  output: any;
}

const ToggleContent: React.FC<ToggleContentProps> = ({ output }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <button onClick={handleToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
        {showDetails ? 'Hide Detailed Breakdown' : 'Show Detailed Breakdown'}
      </button>
      {showDetails && output.details.tableData?.map((table) => {
        let balance = Number(table.OpenBal.replace(/,/g, ''));
        let spent = Number(table.Credit.replace(/,/g, ''));
        let total = Number(table.Close.replace(/,/g, ''));
        let actual = Number(table.Act.replace(/%/g, ''));
        let projected = Number(table.Pro.replace(/%/g, ''));
        let variations = Number(table.Var.replace(/%/g, ''));
        balance = isNaN(balance) ? 0 : balance;
        spent = isNaN(spent) ? 0 : spent;
        total = isNaN(total) ? 0 : total;
        actual = isNaN(actual) ? 0 : actual;
        projected = isNaN(projected) ? 0 : projected;
        variations = isNaN(variations) ? 0 : variations;
        let invdata = table.INV_Data;

        return (
          <div className="mt-6 flow-root" key={table.Category}>
            <div className="inline-block min-w-full align-middle">
              <h1 className="text-lg bg-lightBlue-500 text-black">{table.Category}</h1>
              <div className="gap-10 flex flex-wrap rounded-lg bg-gray-50 p-2 md:pt-2 justify-center md:justify-start">
                <BarChart balance={balance} spent={spent} />
                <CardDetails total={total} balance={balance} spent={spent} />
                <CardDetails2 actual={actual} projected={projected} variations={variations} />
                <div className="hidden md:block rounded-2xl shadow-lg md:flex-col flex-row space-y-0 space-x-4 items-center md:space-y-4 md:space-x-0 p-4 md:pt-40">
                  <ButtonWithModal tableData={invdata} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToggleContent;
