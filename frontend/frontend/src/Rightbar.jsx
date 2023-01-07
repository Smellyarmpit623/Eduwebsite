import React, { Fragment, useContext, useState } from 'react'
import { Box, Container, Typography,Stack, Button, Fab} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserContext } from './Context/UserContext';
import { FeedContext } from './Context/FeedContext';
import { SnackContext } from './Context/Snackbar';
import { Link } from 'react-router-dom';


const Rightbar = () => {
  const {mdCID1,mdItemName1,md1} = useContext(FeedContext)
  const [mdCID,setmdCID]=mdCID1
  const [md,setmd] = md1
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [admin]=admin1
  const [mdItemName,setmdItemName]=mdItemName1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1
  return (
    <Box>
      {admin?(<Fragment>
        <Link to={`/editor/${mdCID}/${mdItemName}`}><Fab color="secondary" aria-label="edit" variant='extended' sx={{
        margin:"8px"
      }}>
        <EditIcon sx={{mr:1}}/>
        编辑笔记
      </Fab>
      </Link>
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