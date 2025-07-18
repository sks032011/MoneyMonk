import React, { Children, createContext, useState } from 'react';

//in this file we will create contect which will be used to provide user data to the entire app ex : user name, email, etc. and also provide functions to update the user data like login, logout, etc. 

export const UserContext = createContext();

const UserProvider=({children})=>{
    const [user,setUser]=useState(null); //user state to hold user data like name, email, etc. 

    //fn to updte user dta
    const updateUser=(userData)=>{
        setUser(userData);
    }
    //fn to clear user data (on logout)
    const clearUser=()=>{
        setUser(null);
    }
  //the childeren will ghave access to the user data and functions to update or clear it
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children} 
        </UserContext.Provider>
    );

}

export default UserProvider;