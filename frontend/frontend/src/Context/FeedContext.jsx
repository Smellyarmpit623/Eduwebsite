import React, { createContext, useEffect, useState } from 'react'

export const FeedContext = createContext();

export const FeedContextProvider = (props) => {
    const [mdCID,setmdCID]=useState("")
    const [mdItemName,setmdItemName]=useState("")
    const [md,setmd]=useState(``)
  return (
    <FeedContext.Provider value={{mdCID1:[mdCID,setmdCID],mdItemName1:[mdItemName,setmdItemName],md1:[md,setmd]}}>
        {props.children}
    </FeedContext.Provider>
  )
}
