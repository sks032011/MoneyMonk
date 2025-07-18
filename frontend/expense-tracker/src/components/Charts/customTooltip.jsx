import React from 'react'

const customTooltip = ({active,payload}) => { //active-checks if the tooltip is active, payload-contains the data for the tooltip
    //if the tooltip is active and there is data in the payload, then render the tooltip
    if(active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-800">
                <p className="text-xs font-semibold text-blue-700 mb-1">{payload[0].name}</p>
                <p className="text-sm text-gray-600">
                    Amount:  <span className='text-sm font-medium text-gray-900'>${payload[0].value} </span>
                </p>
            </div>
        )
    }
  
}

export default customTooltip
