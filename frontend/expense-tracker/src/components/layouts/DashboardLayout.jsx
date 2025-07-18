import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';
import Sidebar from './Sidebar';


const DashboardLayout = ({children,activeMenu}) => {
    const {user}=useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {
        (user &&(
            <div className="flex">
                <div className="max-[1080px]:hidden">
                    <Sidebar activeMenu={activeMenu} />
                </div>
                {/* grow is used to make the sidebar and content take full height */}
                <div className="grow mx-5">{children}</div>

            </div>
        ))
      }
    </div>
  )
}

export default DashboardLayout
