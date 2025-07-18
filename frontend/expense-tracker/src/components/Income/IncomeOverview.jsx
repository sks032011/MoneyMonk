import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBcData } from '../../utils/helper';

const IncomeOverview = ({transactions,onAddIncome}) => {
   const[chartData,setChartData]= useState([]);
   useEffect(()=>{
    const res=prepareIncomeBcData(transactions);
    setChartData(res);    

    return ()=>{};

    
   },[transactions]);
    return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className='  '>
            <h5 className='text-lg'>Income Overview</h5> 
            <p className='text-xs text-gray-400 mt-0'>
                Track your earnings over time and and get an idea of spendings and savings
            </p>
        </div>
         <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg'/>
          Add income
         </button>
      </div>
      <div className='mt-10'>
  {chartData.length === 0 ? (
    <p className="text-gray-400 text-center">No income data available.</p>
  ) : (
    <CustomBarChart data={chartData} />
  )}
</div>
    </div>
  )
}

export default IncomeOverview
