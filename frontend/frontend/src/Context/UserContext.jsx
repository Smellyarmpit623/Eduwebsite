import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Token } from '@mui/icons-material';
import { SnackContext } from './Snackbar';
import { BackendContext } from './BackendContext';


export const UserContext = createContext();

export const UserContextProvider=(props)=>{
    const [token,settoken]=useState(localStorage.getItem("Token"))
    const [Admin,setAdmin] = useState(false)
    const [Super,setSuper] = useState(false)
    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity]=snackseverity1
    const [add,setadd]=useContext(BackendContext)
    useEffect(()=>{
        const fetchuser=async()=>{
            const requestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              };
        
              const response = await fetch(add+"/User/Me/", requestOptions)
              if (!response.ok) {
                settoken(null);
                
              }
              else{
                response.json().then((User)=>{
                  if(User.Title === "Admin" || User.Title === "Teacher Assistant" || User.Title === "Tutor" || User.Title === "Teacher" || User.Title === "Super Admin")
                  {
                    setAdmin(true)
                  }
                  else{
                    setAdmin(false)
                  }
                  if(User.Title !== "Super Admin")
                  {
                    setSuper(false)
                  }

                  
                  if (User.Title === "Super Admin"){
                    setsnackmsg("欢迎回来超级管理员 "+User.User_ID)
                    setsnackseverity("success")
                    setGBsnack(true);
                  }
                  else{
                    setsnackmsg("欢迎回来 "+User.User_ID)
                    setsnackseverity("success")
                    setGBsnack(true);
                  }
                  
                })
                
              }
              
              
              localStorage.setItem("Token", token);
        
        };
        fetchuser()
    },[token])
    return(
        <UserContext.Provider value={{token1:[token,settoken],admin1:[Admin,setAdmin],superadmin1:[Super,setSuper]}}>
            {props.children}
        </UserContext.Provider>
    )
}