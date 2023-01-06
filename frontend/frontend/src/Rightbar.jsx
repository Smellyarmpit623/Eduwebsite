import React, { useState } from 'react'
import { Box, Container, Typography,Stack, Button, Fab} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Rightbar = () => {
  
  return (
    <Box>
      <Fab color="secondary" aria-label="edit" variant='extended' sx={{
        margin:"8px"
      }}>
        <EditIcon sx={{mr:1}}/>
        编辑笔记
      </Fab>
      <Fab color="secondary" aria-label="edit" variant='extended' sx={{
        margin:"8px"
      }}>
        <DeleteForeverIcon sx={{mr:1}}/>
        删除笔记
      </Fab>
    </Box>
  )
}

export default Rightbar