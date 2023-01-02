import React,{useState} from 'react'
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