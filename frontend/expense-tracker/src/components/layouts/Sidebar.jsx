import React, { useContext } from 'react'
import { sidebarData } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === '/logout') {
      localStorage.clear(); //remove the token from local storage
      clearUser();

      navigate('/login');
      return; // redirect to login page after clearing user data
    }
    else {
      navigate(route);
    }
  }

  return <div className='w-65 h-[calc(100vh-60px)] bg-gray-100 border-r border-gray-200/50 p-4 sticky '>
    {sidebarData.map((item, index) => (
      <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-2 text-[14px] ${activeMenu === item.label ? 'bg-blue-500 text-white' : ''} py-2 rounded-lg mb-3 px-6 hover:bg-gray-200 hover:text-blue-700`}

        onClick={() => handleClick(item.path)}


      >
        <item.icon className='text-xl' />
        {item.label}
      </button>
    ))}
    <div className=' flex flex-end items-center bottom-5 right-20 absolute justify-center mt-3 gap-4 mb-6'>
      {user?.profileImgUrl ? (
        <img src={user?.profileImgUrl || ""} 
        alt="pfp" 
        className='w-20 h-20 bg-slate-500 rounded-full' />
      ) : <></>}

      <h5 className=' text-gray-950 text-2xl font-serif font-medium  '>
        {user?.name || ""}
      </h5>

    </div>
  </div>
}

export default Sidebar
