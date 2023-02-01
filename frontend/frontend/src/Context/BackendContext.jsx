import React, { createContext, useState } from 'react'

export const BackendContext = createContext();

export const BackendContextProvider = (props) => {

    const [add,setadd]=useState("http://127.0.0.1:8000")

  return (
    <BackendContext.Provider value={[add,setadd]}>
        {props.children}
    </BackendContext.Provider>
  )
}
