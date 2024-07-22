'use client'
import { useState} from 'react';
import { Dialog, DialogTitle} from '@headlessui/react';

interface TableData {
  [key: string]: string | number;
}

interface ButtonWithModalProps {
  tableData: TableData[];
}

const ButtonWithModal: React.FC<ButtonWithModalProps> = ({ tableData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded">
        Show Invoices
      </button>

      <Dialog as="div" open={isOpen}  onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
          
      +<div className="flex items-center justify-center min-h-screen">
          <Dialog.Panel className="bg-sky-50 p-6 rounded shadow-md w-3/4">
          
            <DialogTitle className="text-lg font-bold">Invoice Data</DialogTitle>
            <br/>
            <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                    <th key='prefix' className="px-4 py-2 border">Prefix</th>
                    <th key='Date' className="px-4 py-2 border">Date</th>
                    <th key='Start Date' className="px-4 py-2 border">Start Date</th>
                    <th key='End Date' className="px-4 py-2 border">End Date</th>
                    <th key='Document Reference' className="px-4 py-2 border">Document Reference</th>
                    <th key='ProName' className="px-4 py-2 border">Name</th>
                    <th key='Lncode' className="px-4 py-2 border">Lncode</th>
                    <th key='Dr' className="px-4 py-2 border">Dr</th>
                    <th key='Cr' className="px-4 py-2 border">Cr</th>
                    <th key='CumBal' className="px-4 py-2 border">Cumulative Balance</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-4 py-2 border">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <button onClick={closeModal} className="ml-auto block mt-4 px-4 py-2 bg-red-500 text-white rounded justify-end">
              Close
            </button>
          </Dialog.Panel>
          </div>
      </Dialog>
    </div>
  );
};

export default ButtonWithModal;
