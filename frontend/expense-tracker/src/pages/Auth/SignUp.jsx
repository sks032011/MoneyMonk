import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateemail } from '../../utils/helper'
import signupimg from '../../assets/images/signup_image.svg'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
// import axios from 'axios'
import { useContext } from 'react'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

const SignUp = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const HandleSignup = async (e) => {
    e.preventDefault();

    setProfilePic(null);

    if (!fullName) setError('Please enter full name');

    if (!validateemail(email)) {
      setError("Invalid Email")
      return;
    }
    if (!password) setError('Please enter password');
    setError("");

    // SIGNUP API CALL 
    //txt
    try {
      let profileImgUrl = " ";
      // uploading profile image if selected
      if (profilePic) {

        const imgUploadRes = await uploadImage(profilePic);
        profileImgUrl = imgUploadRes.imageUrl || " ";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImgUrl
      })
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        //update user context
        updateUser(user);
        navigate('/dashboard');
      }
    }
    catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else setError('An error occurred while signing up. Please try again later.');
    }
  }

  return (
    <AuthLayout image={signupimg}>
      <div className='lg:w-[70%] h-screen md:h-3/4 md:h-full flex flex-col justify-center '>
        <h3 className=' md:text-xl  text-black font-semibold ' >Create your account <span className='text-xl ml-4 text-blue-500 hidden md:block'>^_^</span> </h3>
        <p className='text-xs text-slate-700 mt-2 mb-6'>
          Join us by entering your details below
        </p>
        <form onSubmit={HandleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className=' gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Name"
              placeholder="saksham kumar singh"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="sks@gmail.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="8+ characters"
              type="password"
            />
            {error && <p className='text-red-600 pb-3 text-xs'>{error}</p>}
            <button type='submit' className='btn-pmy'>
              SignUp
            </button>
            <p className='text-[12px]  text-slate-800'>
              Already have an account?{' '}
              <Link className='font-medium text-blue-950 underline hover:text-purple-500' to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
