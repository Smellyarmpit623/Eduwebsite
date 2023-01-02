import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Token } from '@mui/icons-material';


export const UserContext = createContext();

export const UserContextProvider=(props)=>{
    const [token,settoken]=useState(localStorage.getItem("Token"))
    useEffect(()=>{
        const fetchuser=async()=>{
            const requestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              };
        
              const response = await fetch("http://127.0.0.1:8000/User/Me/", requestOptions);
              if (!response.ok) {
                settoken(null);
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