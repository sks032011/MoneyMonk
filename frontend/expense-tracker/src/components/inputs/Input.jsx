import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleshowpass = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <label className='text-[14xl] text-slate-700'>{label}</label>
            <div className='inputBox flex'>
                <input
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none border-b-2 border-slate-300 focus:border-blue-500 transition-all duration-200 border-dotted'
                />
                {type == 'password' && (
                    <>
                    {
                        showPassword?(
                        <FaRegEye
                         size={20}
                         className='cursor-pointer text-blue-600'
                            onClick={()=>handleshowpass()}
                        />
                        ):
                        (
                            <FaRegEyeSlash
                            size={20}
                            className='cursor-pointer text-slate-500'
                            onClick={()=>handleshowpass()}
                            
                            />
                        )
                    }
                    </>

                )}
            </div>
        </div>
    )
}

export default Input
