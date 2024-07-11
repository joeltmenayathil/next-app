import { fetchBudgetData, fetchBudgetTableData } from '@/app/lib/data';

export default async function BudgetTableDump() {
    const budgetdump2= await fetchBudgetTableData();
    console.log(budgetdump2)
    return (            
    <pre>{JSON.stringify(budgetdump2, null, 2)}</pre>
)
}