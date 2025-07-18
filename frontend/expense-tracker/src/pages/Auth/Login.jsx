import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateemail } from '../../utils/helper'
import financial from '../../assets/images/financial_chart.svg'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useContext } from 'react'
import UserProvider, { UserContext } from '../../context/userContext'


const Login = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  const {updateUser}=useContext(UserContext)

  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();

    if (!validateemail(email) && !password) {
      setError('Please enter a valid email address and password')
      return;
    }
    if (!validateemail(email)) {
      setError('Please enter a valid email address')
      return;
    }
    if (!password) {
      setError('Please enter a password')
      return;
    }
    setError("") // after validation, clear the error message

    //now we will make an api call to the backend with the email and password
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })
      //if the response is successful, we will store the token in local storage and redirect to the dashboard
      const { token, user } = response.data; //response.data has for ex --{ id, user,token ,createdAt, updatedAt } 
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user); //update the user context with the user data
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else setError('An error occurred while logging in. Please try again later.');
    }
  }
  return (

    <AuthLayout image={financial}>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center '>
        <h3 className='text-xl text-black font-semibold ' >Welcome Back!!</h3>
        <p className='text-xs text-slate-700 mt-2 mb-6'>
          Please enter your credentials to access your account.
        </p>
        <form onSubmit={HandleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            
            type="password"
          />
          {error && <p className='text-red-600 pb-3 text-xs'>{error}</p>}
          <button type='submit' className='btn-pmy'>
            Login
          </button>
          <p className='text-[12px] mt-9 text-slate-800'>
            Don't have an account?{' '}
            <Link className='font-medium text-blue-950 underline hover:text-purple-500' to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
