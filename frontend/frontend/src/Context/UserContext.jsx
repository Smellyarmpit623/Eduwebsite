import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'


export const UserContext = createContext();

export const UserContextProvider=(props)=>{
    const [token,settoken]=useState(localStorage.getItem("Token"))
    useEffect(()=>{
        const fetchuser=async()=>{
            const response=await axios.get('http://127.0.0.1:8000/User/Me/',{
                headers: {
                    "Accept":"application/json",
                    "Authorization":"Bearer "+token
                }
            }).then(function(response){
                console.log(response)
                return response
            })
            .catch(function(error){
                console.log(error)
            })
            if(!response.ok){
                settoken('')
            }
            localStorage.setItem("Token",token)
        };
        fetchuser()
    },[token])
    return(
        <UserContext.Provider value={[token,settoken]}>
            {props.children}
        </UserContext.Provider>
    )
}