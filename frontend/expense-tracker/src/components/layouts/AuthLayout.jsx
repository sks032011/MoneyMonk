import React from 'react'
import {LuTrendingUpDown} from 'react-icons/lu'

const AuthLayout = ({children,image}) => {
return <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-5 md:pt-8  md:pb-12'>
            <h2 className='text-[25px] font-fam'>Money Monk</h2>
            {children}
        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-violet-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            {/* <div className='w-48 h-48 rounded-[40px] bg-blue-800 absolute -top-7 -left-5'></div> */}
            <div className='w-48 h-56 border-[20px] rounded-[40px] border-blue-950 absolute top-[30%] bg-purple-300 -right-15'></div>
            <div className='w-48 h-48 rounded-[40px] bg-blue-500 absolute -bottom-7 -left-5'></div>


            <div className='grid grid-cols-1 z-20'>
                <Statsinfo
                icon={<LuTrendingUpDown />}
                label="Track your expenses"
                value="&#8377;340000"
                color="bg-blue-500"
                />
            </div>

            <img src={image} alt="??" className='absolute bottom-10 w-64 lg:w-[90%] shadow-lg shadow-purple-900/15 ' />
        </div>
    </div>
}

export default AuthLayout

const Statsinfo = ({icon, label, value, color}) => {
    return (
        <div className='flex  z-20 bg-white rounded-2xl p-1 items-center gap-5 mb-6 shadow-md shadow-slate-900/10'>
            <div className={`w-12 h-12 rounded-full flex justify-center items-center ${color}`}>
                {icon}
            </div>
            <div>
                <p className='text-sm text-slate-700'>{label}</p>
                <h3 className='text-lg font-semibold text-slate-900'>{value}</h3>
            </div>
        </div>
    )
}