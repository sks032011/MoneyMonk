import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import Sidebar from './Sidebar';
// import moneybag from "../../assets/images/money_bag.png";


const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className='flex gap-5 bg-gray-800/60 border-b border-white-800 backdrop-blur-[2px] py-4 px-8 sticky top-0 z-36 '>
      <button
        className='block lg:hidden text-black'
        onClick={() => {
          setOpenSideMenu(!openSideMenu)
        }}
      >
        {
          openSideMenu ? (
            <HiOutlineX className='text-2xl text-gray-700' />
          ) : (
            <HiOutlineMenu className='text-2xl text-gray-700' />
          )
        }
      </button>
       
      <h2 className='font-fam text-xl md:text-[25px] font-bold text-white'><span className='text-blue-900'>Money</span> Monk</h2>
      {/* <div className=" ml-auto">
        <img src={moneybag} alt="Money Bag" className="w-5 h-5 object-contain overflow-none  " />
      </div> */}
      

      {/* if openSideMenu == true, then show the sidebar  */}
      {openSideMenu && (
        // fixed is used to make the sidebar fixed to the top of the screen
        <div className='fixed top-[60px] -ml-10 bg-white'>
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar
