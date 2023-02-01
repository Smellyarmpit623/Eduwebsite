import { Alert, Box, createTheme, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Paper, Snackbar, TextField, ThemeProvider } from '@mui/material';
import React, { useContext } from 'react'
import { useState } from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Draggable from 'react-draggable';
import axios from 'axios';
import { SnackContext } from './Context/Snackbar';
import { BackendContext } from './Context/BackendContext';
import { UserContext } from './Context/UserContext';
import { GlobalSnackbar } from './Snackbar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AdminLogin = () => {
    const [adminlogin,setadminlogin]=useState(true)
    const [User_ID,setUser_ID]=useState("")
    const [Password,setPassword]=useState("") 
    const [notiopen,setnotiopen]=useState(false)
    const [ErrorMsg,setErrorMsg]=useState("")
    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity] = snackseverity1
    const [notiftype,setnotifytype]=useState("")
    const [add,setadd]=useContext(BackendContext)
    const {token1,admin1,superadmin1}=useContext(UserContext)
    const [token,settoken]=token1
    const [Super,setSuper] = superadmin1
    const navigate = useNavigate();

    useEffect(()=>{
      settoken(null)
    }

    ,[])

    const handleLogin = async() => {
        //
        if(Password.length>=6 && User_ID.length>0)
        {
          const requestoption={
            method:"POST",
            url: add+"/SuperAdmin/Login/",
            headers: {
              "Accept":"application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data:{
              username:User_ID,
              password:Password
            }
          }
          await axios.request(requestoption)
          .then(function(response){
            settoken(response.data.access_token)
            setSuper(true)
            navigate('/Admin/Tool/Home/')
          })
          .catch(function(error){
            if (error.response) {
              if(error.response.data.detail==="Invalid Credentials" || error.response.status===401)
              {
                setErrorMsg("密码或用户名错误 😣")
                setnotifytype("error")
                setnotiopen(true);
              }
              if(error.response.data.detail==="Not a Super Admin" || error.response.status===403)
              {
                setErrorMsg("权限不足! 😣")
                setnotifytype("error")
                setnotiopen(true);
              }
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          })
    
        }
        else{
          if(User_ID.length===0)
          {
            setErrorMsg("用户名不能为空")
            setnotifytype("warning")
            setnotiopen(true);
          }
          else{
            setErrorMsg("请确保密码在6位以上")
            setnotifytype("warning")
            setnotiopen(true);
          }
        }
        
      };



  return (
    
    <ThemeProvider theme={darkTheme}>
    <GlobalSnackbar/>
    <CssBaseline/>
    <Dialog
      open={adminlogin}
      fullWidth={true}
      maxWidth={'xs'}
      onClose={()=>{
        setadminlogin(true)
      }}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle id="draggable-dialog-title">
        超级管理员登录
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        
      </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="管理员用户名"
            fullWidth
            variant="filled"
            value={User_ID}
            onChange={(e)=>setUser_ID(e.target.value)}
            />
            <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="密码"
            type="password"
            fullWidth
            variant="filled"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Snackbar
                open={notiopen}
                autoHideDuration={3500}
                onClose={()=>setnotiopen(false)}
                
            >
            <Alert severity={notiftype} sx={{ width: '100%',backgroundColor:"inherit" }}>
                {ErrorMsg}
            </Alert>
            </Snackbar>
      </DialogContent>
      <DialogActions>
            <Fab color="secondary" onClick={()=>{navigate('/')}} aria-label="edit" variant='extended' sx={{
                margin:"8px" 
            }}>
                <ExitToAppIcon sx={{mr:1}}/>
                回到主页
            </Fab>
            <Fab color="secondary" onClick={()=>{handleLogin()}} aria-label="edit" variant='extended' sx={{
                margin:"8px" 
            }}>
                <VpnKeyIcon sx={{mr:1}}/>
                登录
            </Fab>
      </DialogActions>
  </Dialog>
  </ThemeProvider>
  
  )
}
