import React,{useContext, useState} from 'react'
import { Box, Container, Typography,Stack, Paper} from '@mui/material';
import { useEffect } from 'react';
import nigga from './nigga.txt'
import Code from './MDcomponent/CodeBlock';
import { YTPlayer } from './MDcomponent/YoutubePlayer';
import { LatexComponent } from './MDcomponent/Latex';
import Termernology from './MDcomponent/Termernology.jsx';
import Markdown from "markdown-to-jsx"
import Htmlblock from './MDcomponent/Htmlblock';
import { Html } from '@mui/icons-material';
import { UserContext } from './Context/UserContext';
import { FeedContext } from './Context/FeedContext';
import { SnackContext } from './Context/Snackbar';





const Feed = () => {
  const [md,setmd] = useState(``)
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const {mdCID1,mdItemName1} = useContext(FeedContext)
  const [mdCID,setmdCID]=mdCID1
  const [mdItemName,setmdItemName]=mdItemName1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1

  useEffect(() => {
    const updatemd=async()=>{
      if(mdCID!=="" || mdItemName !== "")
      {
        const requestoptions={
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          
        }
        const response = await fetch("http://127.0.0.1:8000/Course/GetContent/"+mdCID+"/"+mdItemName+"/",requestoptions)
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
              console.log(value)
              setmd(value)
            })
            
            
            
          }
        }
      }
    }
    updatemd()

  },[mdItemName,mdCID]);

  return (
    <Box sx={{
      fontSize:"20px",
    }}>
    <Paper elevation={0}>
     <Markdown 
     options={{
            overrides: {
              Code: {
                component: Code
              },
              YTPlayer: {
                component: YTPlayer
              },
              Latex:{
                component: LatexComponent
              },
              Pedia:{
                component: Termernology
              },
              Html:{
                component: Htmlblock
              },
            }
          }}>
            {md}
      </Markdown>
      </Paper>
    </Box>
  )
}

export default Feed