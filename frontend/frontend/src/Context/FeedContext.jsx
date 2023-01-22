import React, { createContext, useEffect, useState } from 'react'

export const FeedContext = createContext();

export const FeedContextProvider = (props) => {
    const [mdCID,setmdCID]=useState("")
    const [mdItemName,setmdItemName]=useState("")
    const [md,setmd]=useState(``)
    const [entry,setentry]=useState(false)
  return (
    <FeedContext.Provider value={{mdCID1:[mdCID,setmdCID],mdItemName1:[mdItemName,setmdItemName],md1:[md,setmd],entry1:[entry,setentry]}}>
        {props.children}
    </FeedContext.Provider>
  )
}
