import React, { useContext, useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from '@mui/joy/styles';
import { FeedContext } from '../Context/FeedContext';
import { SnackContext } from '../Context/Snackbar';
import { UserContext } from '../Context/UserContext';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Draggable from 'react-draggable';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const MDToolbar = () => {
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
    const [select,setselect]=useState(false)
    const [confirm,setconfirm]=useState(false)
    const [newname,setnewname]=useState("")
    const label = { inputProps: { 'aria-label': '确认上传' } }; 
  
  const upload= async()=>{
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body:JSON.stringify({
        "CourseID":mdCID,
        "ItemName":mdItemName,
        "MarkdownUpdate":md,
        "NewItemName":mdItemName,
      })
    };

    const response = await fetch("http://120.79.159.198:5000/Course/UpdateItem/", requestOptions)
    
  }

  return (
    <Box>


      <Fab color="secondary" onClick={()=>setselect(true)} aria-label="edit" variant='extended' sx={{
        margin:"8px" 
      }}>
        <FindInPageIcon sx={{mr:1}}/>
        选择笔记
      </Fab>


        <Fab color="secondary" onClick={()=>setconfirm(true)} aria-label="edit" variant='extended' sx={{
        margin:"8px" 
      }}>
        <PublishIcon sx={{mr:1}}/>
        上传
      </Fab>

      
      
      <Dialog
      open={select}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setselect(false)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        选择笔记
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        
      </DialogContentText>
      
      </DialogContent>
      <DialogActions>

      </DialogActions>
  </Dialog>

  <Dialog
      open={confirm}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setconfirm(false)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        确认上传
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        <Typography>请确认内容，一旦上传无法撤回</Typography>
        
      </DialogContentText>
      
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={upload}>上传</Button>
      </DialogActions>
    </Dialog>
    </Box>
  )
}
