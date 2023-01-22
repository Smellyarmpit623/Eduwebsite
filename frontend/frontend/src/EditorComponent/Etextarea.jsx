import React, { useContext, useEffect } from 'react'
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from '@mui/joy/styles';
import { FeedContext } from '../Context/FeedContext';
import { SnackContext } from '../Context/Snackbar';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

export const ETextarea = (props) => {
    const {mdCID1,mdItemName1,md1} = useContext(FeedContext)
    const {token1,admin1}=useContext(UserContext)
    const [token,settoken]=token1
    const [mdCID,setmdCID]=mdCID1
    const [md,setmd] = md1
    const [mdItemName,setmdItemName]=mdItemName1
    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity]=snackseverity1

    useEffect(()=>{
      setmdCID(props.cid)
      setmdItemName(props.itn)
    },[])

    useEffect(()=>{
      const updatemd=async()=>{
        if(mdCID!=="" && mdItemName !== "" && mdCID!==undefined &&mdItemName!==undefined)
        {
          const requestoptions={
            method:"GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            
          }
          console.log(props.cid)
          const response = await fetch("http://120.79.159.198:5000/Course/GetContent/"+mdCID+"/"+mdItemName+"/",requestoptions)
          if(!response.ok)
          {
            if(response.status===403)
            {
              setsnackmsg("课程 "+mdCID+" 学习时间已到期，请和管理员联系")
              setsnackseverity("warning")
              setGBsnack(true);
            }
            if(response.status===404)
            {
              setsnackmsg("笔记内容找不到了 :(")
              setsnackseverity("error")
              setGBsnack(true);
            }
            if(response.status===402)
            {
              setsnackmsg("欢迎加入课程 "+mdCID+",当前还不能查看任何资源哦，请联系管理员")
              setsnackseverity("info")
              setGBsnack(true);
            }
            setmd("")
          }
          else{
            if(response.status===200)
            {
              response.json().then((value)=>{
                setmd(value)
              })
              
              
              
            }
          }
        }
      }
      updatemd()
    },[mdItemName,mdCID])

    
  return (
    <CssVarsProvider>
            <Textarea label="Soft" placeholder="Type in here…" variant="outlined" value={md} color="success" onChange={(event)=>setmd(event.target.value)}
            startDecorator={
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                
              </Box>
            }
            sx={{
                outlineColor:"inherit",
                borderColor:"inherit",
                backgroundColor:"inherit",
                color:"whitesmoke",
            }}
            
            />
    </CssVarsProvider>
  )
}
