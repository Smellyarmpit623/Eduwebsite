import React,{useContext, useState} from 'react'
import { Box, Container, Typography,Stack, Paper} from '@mui/material';
import { useEffect } from 'react';
import Code from './MDcomponent/CodeBlock';
import { YTPlayer } from './MDcomponent/YoutubePlayer';
import { LatexComponent } from './MDcomponent/Latex';
import Terminology from './MDcomponent/Terminology.jsx';
import Htmlblock from './MDcomponent/Htmlblock';
import { Html } from '@mui/icons-material';
import { UserContext } from './Context/UserContext';
import { FeedContext } from './Context/FeedContext';
import ReactMarkdown from 'react-markdown'
import { SnackContext } from './Context/Snackbar';
import 'katex/dist/katex.min.css'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coldarkDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { BackendContext } from './Context/BackendContext';






const Feed = () => {
  
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const {mdCID1,mdItemName1,md1} = useContext(FeedContext)
  const [mdCID,setmdCID]=mdCID1
  const [md,setmd] = md1
  const [mdItemName,setmdItemName]=mdItemName1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1
  const [add,setadd]=useContext(BackendContext)

  useEffect(() => {
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
        const response = await fetch(add+"/Course/GetContent/"+mdCID+"/"+mdItemName+"/",requestoptions)
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

  },[mdItemName,mdCID]);

  return (
    <Box sx={{
      fontSize:"20px",
    }}>
      <Paper elevation={0}>
        <ReactMarkdown children={md} remarkPlugins={[remarkMath,remarkGfm]} rehypePlugins={[rehypeKatex]}
         components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={coldarkDark}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true}
                wrapLongLines={true}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                <Terminology>
                  {children}
                </Terminology>
              </code>
            )
          },
          a({title,href,children,...props})
          {
              return(
                <YTPlayer videoId={children}/>
              )
          }
        }}
        
        />
      </Paper>
    </Box>
  )
}

export default Feed