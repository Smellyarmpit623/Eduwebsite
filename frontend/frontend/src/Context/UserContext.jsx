import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Token } from '@mui/icons-material';


export const UserContext = createContext();

export const UserContextProvider=(props)=>{
    const [token,settoken]=useState(localStorage.getItem("Token"))
    const [Admin,setAdmin] = useState(false)
    useEffect(()=>{
        const fetchuser=async()=>{
            const requestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              };
        
              const response = await fetch("http://127.0.0.1:8000/User/Me/", requestOptions)
              if (!response.ok) {
                settoken(null);
                
              }
              else{
                const title=response.json().then((User)=>{
                  console.log(User.Title)
                })
                if(title==="Admin" || title === "Teacher Assistant" || title==="Tutor" || title === "Teacher")
                {
                  setAdmin(true)
                }
              }
              
              
              localStorage.setItem("Token", token);
        
        };
        fetchuser()
    },[token])
    return(
        <UserContext.Provider value={[token,settoken]}>
            {props.children}
        </UserContext.Provider>
    )
}