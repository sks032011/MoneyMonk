// import { useState } from 'react'
import './App.css'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate    // used to redirect users programmatically.

} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import UserProvider from './context/userContext'
import {Toaster} from "react-hot-toast"
function App() {
  


  return (
    <UserProvider>
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<SignUp/>}/>
            <Route path='/dashboard' exact element={<Home/>}/>
            <Route path='/income' exact element={<Income/>}/>
            <Route path='/expense' exact element={<Expense/>}/>
          </Routes>

        </Router>
        
    </div>
    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:'14px'
      },
    }}
    />
    </UserProvider>
  )
}

export default App

const Root=()=>{
  //check if token is present in local storage
  const isLoggedIn=localStorage.getItem('token')?true:false

  // if token is present, redirect to dashboard
  if(isLoggedIn){
    return <Navigate to='/dashboard'/>
  }
  else{
    return <Navigate to='/login'/>
  }
}



// exact: This prop is used to ensure that the route matches exactly. If you don't use it, the route will match any path that starts with the specified path. For example, if you have a route for "/dashboard", it will also match "/dashboard/home" unless you specify exact.
// element: This prop is used to specify the component that should be rendered when the route matches. In this case, it will render the Login component when the user navigates to "/login".