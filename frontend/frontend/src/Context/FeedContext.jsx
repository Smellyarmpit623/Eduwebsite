import React, { createContext, useEffect, useState } from 'react'

export const FeedContext = createContext();

export const FeedContextProvider = (props) => {
    const [mdCID,setmdCID]=useState("")
    const [mdItemName,setmdItemName]=useState("")
  return (
    <FeedContext.Provider value={{mdCID1:[mdCID,setmdCID],mdItemName1:[mdItemName,setmdItemName]}}>
        {props.children}
    </FeedContext.Provider>
  )
}
