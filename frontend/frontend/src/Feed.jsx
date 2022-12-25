import React,{useState} from 'react'
import { Box, Container, Typography,Stack, Paper} from '@mui/material';
import { useEffect } from 'react';
import nigga from './nigga.txt'
import Code from './CodeBlock';
import { YTPlayer } from './YoutubePlayer';
import { LatexComponent } from './Latex';
import Termernology from './Termernology.jsx';
import Markdown from "markdown-to-jsx"





const Feed = () => {
  const [md,setmd] = useState(``)
  useEffect(() => {
    fetch(nigga)
    .then(r => r.text())
    .then(text => {
      setmd(text)
    });
  });
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
            }
          }}>
            {md}
      </Markdown>
      </Paper>
    </Box>
  )
}

export default Feed