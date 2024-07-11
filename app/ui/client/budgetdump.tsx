import { fetchBudgetData } from '@/app/lib/data';

export default async function BudgetDump() {
    const budgetdump= await fetchBudgetData();
    console.log(budgetdump)
    return (            
    <pre>{JSON.stringify(budgetdump, null, 2)}</pre>
)
}

