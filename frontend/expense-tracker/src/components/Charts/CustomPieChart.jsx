import React from 'react'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import customTooltip from './customTooltip';
import customLegend from './customLegend';

const CustomPieChart = ({
  data,
  label,
  colors,
  totalAmount,
  showTextAnchor
}) => {
  //he recharts responsive container automatically adjusts the chart size to fit the parent container, ensuring the chart is visually appealing on any device. (RECHARTS DOCS)
  return <ResponsiveContainer width="100%" height={350}>
    <PieChart>

      <Pie  //the pie chart component that renders the pie chart
        data={data}
        dataKey="amount" //the key in the data that contains the value for each pie slice
        nameKey="name" //the key in the data that contains the name for each pie slice
        cx={"50%"} //the center of the pie chart
        cy={"50%"} //the center of the pie chart
        outerRadius={130}
        labelLine={false} //this disables the lines that connect the labels to the pie slices
        innerRadius={100}
      >

        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        {/* the cell component that renders each pie slice with a specific color */}
      </Pie>

     <Tooltip content={customTooltip} />
        {/*this is a tooltip that shows the name and amount of the data point when hovered over */}
      <Legend content={customLegend}/> {/*this is a legend that shows the names of the data points */}

      {showTextAnchor && (
  <text
    x="50%"
    y="40%"
    textAnchor="middle"
    fontSize="14px"
    fill="#666"
    dominantBaseline="middle"
  >
    {label}
  </text>
)}
{showTextAnchor && (
  <text
    x="50%"
    y="50%"
    textAnchor="middle"
    fontSize="24px"
    fill=""
    fontWeight="500"
    dominantBaseline="middle"
  >
    {totalAmount}
  </text>
)}

    </PieChart>
  </ResponsiveContainer>
}

export default CustomPieChart
