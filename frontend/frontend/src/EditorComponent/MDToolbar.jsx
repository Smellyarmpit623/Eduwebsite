import React, { Fragment, useContext, useEffect, useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from '@mui/joy/styles';
import { FeedContext } from '../Context/FeedContext';
import { SnackContext } from '../Context/Snackbar';
import { UserContext } from '../Context/UserContext';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Draggable from 'react-draggable';
import { margin } from '@mui/system';
import { ChooseWordDialog } from '../MDToolbarComponent/ChooseWordDialog';


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
    const {mdCID1,mdItemName1,md1,entry1} = useContext(FeedContext)
    const [entry,setentry]=entry1
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
    const [cab202,setcab202]=useState([])
    const [cab201,setcab201]=useState([])
    const [mxb100,setmxb100]=useState([])
    const [clist_array,setclist_array]=useState({
      "CAB-202":cab202,
      "CAB-201":cab201,
      "MXB-100":mxb100})
    const [choose,setchoose]=useState(false)
    const [word,setword]=useState("")

    const getitem = async(id) =>{
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
      return await fetch("http://120.79.159.198:5000/Course/GetCourseItem/"+id, requestOptions)
      .then((response)=>response.json())
      .catch(()=>{
            setsnackmsg("获取课程列表时出现未知错误")
            setsnackseverity("error")
            setGBsnack(true);
        }
      )
      
    }
  



    useEffect(()=>{
      setclist_array({
        "CAB-202":cab202,
        "CAB-201":cab201,
        "MXB-100":mxb100})
    }
    ,[cab202,cab201,mxb100])
    
    useEffect(()=>{
      async function get(id){
        return await getitem(id)
      }
      get("CAB-201").then((res)=>setcab201(res))
      get("CAB-202").then((res)=>setcab202(res))
      get("MXB-100").then((res)=>setmxb100(res))
      
    }
    ,[])
  const upload= async()=>{
    
    if(entry===true)
    {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body:JSON.stringify({
          "EntryName": word,
          "UpdateContent": md
        })
      };
      const response = await fetch("http://120.79.159.198:5000/Course/UpdateEntry/", requestOptions)
      if(response.ok)
      {
        setsnackmsg("词条上传完毕，内容已更新 😉")
        setsnackseverity("success")
        setGBsnack(true);
        setconfirm(false)
      }
      else
      {
        if(response.status===403)
        {
          setsnackmsg("权限不足! 😓")
          setsnackseverity("error")
          setGBsnack(true);
          setconfirm(false)
        }
        else
        {
          if(response.status===404)
          {
            if(response.detail==="Entry not found")
            {
              setsnackmsg("词条突然找不到了! 😭")
              setsnackseverity("error")
              setGBsnack(true);
              setconfirm(false)
            }
            else{
              if(response.detail==="Unknown error when writing to md")
              {
              setsnackmsg("写入文件时出错，请联系超级管理员! 😭")
              setsnackseverity("error")
              setGBsnack(true);
              setconfirm(false)
              }
            }
          }
        }
      }
    }
    else
    {
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
      .catch(()=>{
          setsnackmsg("上传失败，原因: 未知")
          setsnackseverity("warning")
          setGBsnack(true);
      })
      .then(()=>{
        setsnackmsg("上传成功!")
        setsnackseverity("success")
        setGBsnack(true);
        setconfirm(false)
      })
  }
    
    
  }

  return (
    <Box>


      <Fab color="secondary" onClick={()=>{setselect(true)
      setentry(false)  
    }} aria-label="edit" variant='extended' sx={{
        margin:"8px" 
      }}>
        <FindInPageIcon sx={{mr:1}}/>
        选择笔记
      </Fab>

      <Fab color="secondary" onClick={()=>setchoose(true)} aria-label="edit" variant='extended' sx={{
        margin:"8px" 
      }}>
        <FindInPageIcon sx={{mr:1}}/>
        选择名词
      </Fab>


        <Fab color="secondary" onClick={()=>setconfirm(true)} aria-label="edit" variant='extended' sx={{
        margin:"8px" 
      }}>
        <PublishIcon sx={{mr:1}}/>
        上传
      </Fab>

      
      <ChooseWordDialog value={[choose,setchoose,word,setword]}/>

      
      <Dialog
      open={select}
      fullWidth={true}
      maxWidth={'xs'}
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
      
      <Box sx={{
        p:2
        
      }}>

        <InputLabel id="demo-simple-select-helper-label">课程ID</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={mdCID}
          label="课程ID"
          onChange={(event)=>{
            setmdCID(event.target.value);
          }}

        >
          <MenuItem value={"CAB-202"}>CAB-202</MenuItem>
          <MenuItem value={"CAB-201"}>CAB-201</MenuItem>
          <MenuItem value={"MXB-100"}>MXB-100</MenuItem>
        </Select>
        {cab201.length===0?(null):(
          <Fragment>
        <InputLabel id="demo-simple-select-helper-label">笔记标题</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={mdItemName}
          label="笔记标题"
          onChange={(event)=>{
            setmdItemName(event.target.value);
          }}
        >
          {

              clist_array[mdCID].map((value)=>
              <MenuItem value={value.ItemName} onClick={()=>{
                setselect(false)
              }}>{value.ItemName}</MenuItem>)

          }
        </Select></Fragment>)
        }
      </Box>
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
