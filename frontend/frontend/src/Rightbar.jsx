import React, { Fragment, useContext, useState } from 'react'
import { Box, Container, Typography,Stack, Button, Fab} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserContext } from './Context/UserContext';


const Rightbar = () => {
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [admin]=admin1
  return (
    <Box>
      {admin?(<Fragment><Fab color="secondary" aria-label="edit" variant='extended' sx={{
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
      </Fab></Fragment>):(null)}
      
    </Box>
  )
}

export default Rightbar