import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

 const COLORS=["#0939ab","#13ba31","#FA2C37", "#FF8042"];


const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = (data) => {
        const dataArr = data.map((item) => ({ 
            name: item?.category,
            amount: item?.amount,
        }));
        setChartData(dataArr);

    }
    useEffect(() => {
        prepareChartData(data);
    }, [data])


    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className='text-lg'>Last 60 days income</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`₹${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />

        </div>

    )
}

export default RecentIncomeWithChart
