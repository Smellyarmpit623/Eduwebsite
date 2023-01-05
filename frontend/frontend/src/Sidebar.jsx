import { Box, Button, IconButton, Typography } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import TerminalIcon from '@mui/icons-material/Terminal';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CalculateIcon from '@mui/icons-material/Calculate';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { UserContext } from './Context/UserContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import PublishIcon from '@mui/icons-material/Publish';
import { SnackContext } from './Context/Snackbar';



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



const Sidebar = () => {
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [admin]=admin1
  const [additem,setadditem]=useState(false)
  const [CourseID,setCourseID]=useState("")
  const [ItemTitle,setItemTitle]=useState("")
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1


  const submit=async()=>{
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body:JSON.stringify({
        "CourseID":CourseID,
        "ItemName":ItemTitle
      })
    }
    const response = await fetch("http://127.0.0.1:8000/Course/AddItem/", requestOptions)
      if (!response.ok) {
        if(response.status===401)
        {
          setadditem(false)
          setsnackmsg("没有足够的权限")
          setsnackseverity("error")
          setGBsnack(true);
        }
        else
        {
        setadditem(false)
        setsnackmsg("未知错误")
        setsnackseverity("error")
        setGBsnack(true);
        }
      }
      else{
        if(response.status===200)
        {
          setadditem(false)
          setsnackmsg(`"`+ItemTitle+`"`+" 添加成功")
          setsnackseverity("success")
          setGBsnack(true);
        }
        
      }

  }

  // useEffect(()=>{
  //   //axios.get
  // }
  // ,[])
  const [open, setOpen] = React.useState(true);
  return (
    <Fragment>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          课程
          {admin?(<IconButton sx={{left:"80%"}} onClick={()=>{setadditem(true)}}><AddBoxIcon/></IconButton>):(null)}
        </ListSubheader>
        
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <PrecisionManufacturingIcon />
        </ListItemIcon>
        <ListItemText primary="CAB-202" secondary="Micro-Controller"/>
      </ListItemButton>
      
      {/* */}
      <ListItemButton>
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        <ListItemText primary="CAB-201" secondary="Programming Principle"/>
      </ListItemButton>

      <ListItemButton onClick={()=>setOpen(!open)}>
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="MXB-100" secondary="Introducory Calculus"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PlayLessonIcon />
            </ListItemIcon>
            <ListItemText primary="Week 0 Introducing Rate Of Change"/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
      <Dialog
      open={additem}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setadditem(false)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        添加笔记
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        
      </DialogContentText>
      <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">课程ID</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={CourseID}
          label="课程ID"
          onChange={(event)=>{
            setCourseID(event.target.value);
          }}
        >
          <MenuItem value={"CAB-202"}>CAB-202</MenuItem>
          <MenuItem value={"CAB-201"}>CAB-201</MenuItem>
          <MenuItem value={"MXB-100"}>MXB-100</MenuItem>
        </Select>
        
      </FormControl>
      <TextField id="filled-basic" label="笔记标题" variant="filled" autoFocus="true" margin="dense" value={ItemTitle} onChange={(event)=>{setItemTitle(event.target.value)}}/>
        
      </DialogContent>
      <DialogActions>

          <Button onClick={submit}><Typography variant='h9'>提交</Typography><PublishIcon/></Button>
        
      </DialogActions>
  </Dialog>
  </Fragment>
  )
}

export default Sidebar