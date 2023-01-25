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
import { FeedContext } from './Context/FeedContext';
import { ElectricBikeSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BackendContext } from './Context/BackendContext';



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

function Course_Item(props){
  const {mdCID1,mdItemName1} = useContext(FeedContext)
  const [mdCID,setmdCID]=mdCID1
  const [mdItemName,setmdItemName]=mdItemName1
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [admin]=admin1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1

  const handleclick=()=>{
    if(token)
    {
      setmdCID(props.value.CourseID)
      setmdItemName(props.value.ItemName)
    }
    else{
      setsnackmsg("请先登录噢")
      setsnackseverity("info")
      setGBsnack(true);
    }
  }
  return(
      <ListItemButton sx={{ pl: 4 }} onClick={handleclick}>
        <ListItemIcon>
          <PlayLessonIcon />
        </ListItemIcon>
        <ListItemText primary={props.value.ItemName}/>
      </ListItemButton>
  )
}

function DisplayItems(props){
  const Item_list=(props.value)
  const Display=Item_list.map((value)=>
    <Course_Item value={value}/>
  );

  return(
    <Fragment>
      {Display}
    </Fragment>
  )
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
  const [cab202,setcab202]=useState([])
  const [cab201,setcab201]=useState([])
  const [mxb100,setmxb100]=useState([])
  const [add,setadd]=useContext(BackendContext)
  const navigate = useNavigate();
  

  //const []



  
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
    const response = await fetch(add+"/Course/AddItem/", requestOptions)
      if (!response.ok) {
        if(response.status===403)
        {
          setadditem(false)
          setsnackmsg("没有足够的权限")
          setsnackseverity("error")
          setGBsnack(true); 
        }
        else
        {
          if(response.status===404)
          {
            setadditem(false)
            setsnackmsg("课程ID不存在")
            setsnackseverity("error")
            setGBsnack(true);
          }
          else{
            setadditem(false)
            setsnackmsg("未知错误")
            setsnackseverity("error")
            setGBsnack(true);
          }
          
        }
      }
      else{
        if(response.status===200)
        {
          setadditem(false)
          setsuc(true)
        }
        
      }

  }

  const getitem = async(id) =>{
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    return await fetch(add+"/Course/GetCourseItem/"+id, requestOptions)
    .then((response)=>response.json())
    .catch(()=>{
          setsnackmsg("获取课程列表时出现未知错误")
          setsnackseverity("error")
          setGBsnack(true);
      }
    )
    
  }

  useEffect(()=>{
    async function get(id){
      return await getitem(id)
    }
    get("CAB-201").then((res)=>setcab201(res))
    get("CAB-202").then((res)=>setcab202(res))
    get("MXB-100").then((res)=>setmxb100(res))

  }
  ,[])
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [suc,setsuc]=useState(false)
  return (
    <Fragment>

    <Dialog
      open={suc}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setsuc(false)
        navigate(0)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        成功
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        <Typography>{`"`+ItemTitle+`"`+" 添加成功"}</Typography>
        
      </DialogContentText>
      
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          setsuc(false)
          navigate(0)
        }} variant='contained'>太好了!</Button>
      </DialogActions>
    </Dialog>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          课程
          {admin?(<IconButton sx={{left:"82%"}} onClick={()=>{setadditem(true)}}><AddBoxIcon/></IconButton>):(null)}
        </ListSubheader>
        
      }
    >
      <ListItemButton onClick={()=>{
         setOpen0(!open0)
        }}>
        <ListItemIcon>
          <PrecisionManufacturingIcon />
        </ListItemIcon>
        <ListItemText primary="CAB-202" secondary="Micro-Controller"/>
        {open0 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {/* Collapse open0*/}
      <Collapse in={open0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cab202.length===0?(null):(<DisplayItems value={cab202}/>)}
        </List>
      </Collapse>

      
      {/* */}
      <ListItemButton onClick={()=>setOpen1(!open1)}>
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        <ListItemText primary="CAB-201" secondary="Programming Principle"/>
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {/* Collapse open1*/}
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cab201.length===0?(null):(<DisplayItems value={cab201}/>)}

        </List>
      </Collapse>
      


      <ListItemButton onClick={()=>setOpen2(!open2)}>
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="MXB-100" secondary="Introducory Calculus"/>
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {/* Collapse open2*/}
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {mxb100.length===0?(null):(<DisplayItems value={mxb100}/>)}

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