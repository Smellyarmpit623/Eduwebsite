import React, { createContext, useState } from 'react'

export const BackendContext = createContext();

export const BackendContextProvider = (props) => {

    const [add,setadd]=useState("http://120.79.159.198:5000")

  return (
    <BackendContext.Provider value={[add,setadd]}>
        {props.children}
    </BackendContext.Provider>
  )
}
