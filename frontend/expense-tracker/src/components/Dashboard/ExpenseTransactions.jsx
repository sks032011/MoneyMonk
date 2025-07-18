import React from 'react'
import{LuArrowRight} from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import Last30DaysExpenses from './Last30DaysExpenses'


const ExpenseTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
            See More <LuArrowRight className='text-base' />
        </button>
      </div>
    
    <div className="mt-6">
        {transactions?.slice(0,5)?.map((expenses)=>(
            <TransactionInfoCard
            key={expenses._id}
            title={expenses.category}
            amount={expenses.amount}
            icon={expenses.icon}
            hideDeleteBtn
            type="expense"
            date={moment(expenses.date).format('DD MMM YYYY')}
             />
        ))}
        <Last30DaysExpenses
        data={transactions}
        />
    </div>

    </div>
  )
}

export default ExpenseTransactions
