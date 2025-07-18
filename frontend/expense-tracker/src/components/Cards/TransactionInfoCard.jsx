import React from 'react'
import {
    LuTrash2,
    LuTrendingDown,
    LuTrendingUp,
    LuUtensils
} from 'react-icons/lu'


const TransactionInfoCard = ({
    key,title,amount,icon,date, type,hideDltBtn,onDelete
}) => {

     
    

    const getAmountStyle = () => {
        if (type === "income") {
            return "bg-green-100 text-green-500";
        } else if (type === "expense") {
            return "bg-red-100 text-red-500";
        } else {
            return "bg-gray-100 text-gray-500";
        }
    }

  return (
    <div className='group relative flex items-center gap-1 p-3 mt-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer'>
      <div className='w-11 h-11 flex items-center justify-center text-xl text-gray-800 mr-1 bg-gray-100 rounded-full'>
        {icon?(
            <img src={icon} alt={title} className='w-6 h-6' />
        ):(
            <LuUtensils/>
        )
          
    }
      </div>
      {/* flex 1 means that the div will take all the available space in the parent div flex 1/2 means that the div will take half of the available space in the parent div */}
      <div className='flex flex-1 items-center justify-between'>
        <p className='text-sm text-gray-700 font-medium'>{title}</p>
        <p className='text-xs text-gray-400 mt-1 ml-3'>{date}</p>
      </div>
      <div className='flex items-center gap-2'>
        {!hideDltBtn && (
    <button
        className='text-gray-400 hover:text-red-500 transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer'
        onClick={() => onDelete && onDelete()}
    >
        <LuTrash2 className='text-red-500' size={17} />
    </button>
)}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getAmountStyle()}`}>
            <h6 className='text-xs font-medium'>
                {type==="income"?"+":"-"}${amount}
            </h6>
            {type === "income" ? (
                <LuTrendingUp className='text-green-500' size={17} />
            ) : (
                <LuTrendingDown className='text-red-500' size={17} />
            )}
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard
