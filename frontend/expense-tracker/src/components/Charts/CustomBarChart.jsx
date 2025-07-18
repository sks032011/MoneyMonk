import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,  //legend- a legend is used to show the data key in the chart for ex "amount" in this case
    ResponsiveContainer,
    Cell
} from 'recharts';

const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        // Define colors for each bar based on index
        return index % 2 === 0 ? '#FF8042' : '#00C49F';
    }
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300">
                    <p className='text-xs font-semibold text-blue-500 mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm font-medium text-gray-700'>Rs.{payload[0].value}</p>
                </div>
            )
        }
    }

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} >

                    <CartesianGrid stroke='none' />
                    {/* cartesian grid is used to draw the grid lines in the chart */}

                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#55" }} stroke='none' />
                    {/* month will be considered for x axis */}


                    <YAxis tick={{ fontSize: 12, fill: "#55" }} stroke='none' />
                    {/* Y axis will be considered for amount */}

                    <Tooltip
                        content={CustomTooltip}
                        wrapperStyle={{ background: "transparent", boxShadow: "none", border: "none" }}
                    />
                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                        
                        activeDot={{ r: 8, fill: "yellow" }}
                        activeStyle={{ fill: "green" }}
                    >
                        {/* activedot is used to highlight the bar when hovered */}
                        {/* activeStyle is used to change the style of the bar when hovered */}

                        {
                            data.map((entry, index) => (
                                <Cell key={index} fill={getBarColor(index)} />
                                // Cell is used to color the bar
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
