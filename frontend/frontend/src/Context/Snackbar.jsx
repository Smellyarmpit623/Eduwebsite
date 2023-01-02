import React, { createContext, useEffect, useState } from 'react'

export const SnackContext = createContext();

export const SnackbarContextProvider = (props) => {
    const [GBsnack,setGBsnack]=useState(false)
    const [snackmsg,setsnackmsg]=useState("123")
    const [snackseverity,setsnackseverity]=useState("success")
  return (
    
    <SnackContext.Provider value={[GBsnack,setGBsnack,snackmsg,setsnackmsg,snackseverity,setsnackseverity]}>
        {props.children}
    </SnackContext.Provider>
  )
}
